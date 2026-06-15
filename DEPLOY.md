# 배포 가이드 (GitHub Actions → 서버 자동 배포)

이 템플릿은 **main에 push하면 ① 빌드 검사 → ② 서버 SSH 접속 → git pull → docker compose 재실행** 으로 자동 배포된다.
워크플로우 정의: `.github/workflows/deploy.yml`

---

## 전체 그림

```
git push (main)
     ↓
[build] 프론트 npm run build + 백엔드 import 검사
     ↓ 통과 ✅          ↓ 실패 ❌ → 멈춤 (서버 그대로, 배포 안 됨)
[deploy] 서버 SSH → git pull → docker compose up -d --build
```

- **변하는 것(서버 주소/키)** → 리포별 GitHub Secret 으로 보관
- **안 변하는 것(인증 토큰 + 배포 로직)** → PAT 하나 + 이 워크플로우로 공통화

---

## 1. 서버 1회 준비

```bash
# Docker + Compose (Ubuntu 24.04+ 기준)
sudo apt update && sudo apt install -y docker.io docker-compose-v2 git
sudo usermod -aG docker $USER   # 적용하려면 재로그인

# 리포 클론 (~/<리포이름> 경로 — 워크플로우가 이 경로를 자동 사용)
git clone https://github.com/<owner>/<repo>.git ~/<repo>
cd ~/<repo>
cp .env.example .env && nano .env   # 환경변수 채우기
docker compose up -d --build        # 최초 1회 수동 실행
```

---

## 2. 비공개 리포 인증 (둘 중 하나)

서버의 `git pull`이 비밀번호 없이 되게 해야 자동 배포가 동작한다.

### 방법 A. Deploy Key — 리포 1개만 쓸 때 (가장 단순/안전)

```bash
# 서버에서 키 생성
ssh-keygen -t ed25519 -C "<repo>-deploy" -f ~/.ssh/<repo>_deploy -N ""
cat ~/.ssh/<repo>_deploy.pub   # 이 공개키를 복사

# GitHub: 리포 > Settings > Deploy keys > Add deploy key
#   - 위 공개키 붙여넣기, "Allow write access" 체크 안 함 (읽기 전용)

# 서버: git이 이 키를 쓰도록 설정
cat >> ~/.ssh/config <<'EOF'

Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/<repo>_deploy
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config
ssh-keyscan github.com >> ~/.ssh/known_hosts
git remote set-url origin git@github.com:<owner>/<repo>.git
git pull origin main   # 비밀번호 안 물으면 성공
```

> 같은 서버에 여러 리포면 `Host` 별칭(`github.com-repoA` 등)으로 키를 구분하고
> remote도 `git@github.com-repoA:...` 로 지정한다.

### 방법 B. Fine-grained PAT — 리포 여러 개를 토큰 하나로 (서버 여러 대일 때 편함)

**PAT 발급:** GitHub → Settings → Developer settings → **Personal access tokens → Fine-grained tokens** → Generate
- Token name: `server-deploy` / Expiration: 90일~1년(만료 갱신 메모)
- Repository access: **Only select repositories** → 배포할 리포들 선택
- Permissions → Repository permissions → **Contents: Read-only**
- Generate 후 `github_pat_...` 문자열 즉시 복사 (다시 못 봄)

**서버에 적용:** (각 서버에서 자기 리포에 대해)
```bash
git remote set-url origin https://x-access-token:<github_pat_...>@github.com/<owner>/<repo>.git
git pull origin main   # 통과하면 성공
```
> 토큰 하나를 여러 서버/리포에 동일하게 심으면 인증이 통일된다. 갱신 시 그 값만 교체.

---

## 3. GitHub Secrets 등록 (리포별)

리포 → **Settings → Secrets and variables → Actions → New repository secret**

| Name | 값 |
|------|-----|
| `EC2_HOST` | 서버 **퍼블릭 IP** (재부팅 시 바뀌면 갱신 — Elastic IP 권장) |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | 서버 접속용 **개인키 전체** (OpenSSH 형식, `-----BEGIN`~`-----END`) |

> PuTTY `.ppk` 만 있으면 PuTTYgen → Conversions → **Export OpenSSH key** 로 변환해서 넣는다.

---

## 4. 동작 확인

push 하거나 Actions 탭에서 **Run workflow** → build → deploy 가 초록불이면 성공.
실패 시: 리포 **Actions** 탭에서 로그 확인 (build 실패면 코드 문제, deploy 실패면 SSH/인증 문제).

---

## 5. 수동 배포 (CI 없이)

```bash
ssh -i key.pem ubuntu@<HOST>
cd ~/<repo> && git pull origin main && docker compose up -d --build
```

또는 로컬에서 `scripts/deploy.sh` (tar+scp 방식) 사용.

---

## 6. 운영 시 주의

- 퍼블릭 IP 고정하려면 **Elastic IP** 부착 (재부팅해도 `EC2_HOST` 안 바뀜)
- 프로덕션은 `docker-compose.yml`(+ `.dev.yml` 아님) 사용 — 프론트는 standalone 빌드로 실행됨
- 빌드 게이트엔 테스트 단계가 없음. 테스트 추가 시 `deploy.yml`의 build job에 step 추가
- 리포가 많아지면: 배포 로직을 **재사용 워크플로우**(중앙 리포 1곳)로 모으고 각 리포는 호출만 하도록 전환 고려
