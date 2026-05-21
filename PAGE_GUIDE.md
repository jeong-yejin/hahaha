# 이 페이지가 뭐예요?

ReboundX라는 회사의 **소개 웹사이트**예요.
ReboundX는 코인이나 주식을 사고파는 사람들을 돕는 회사예요.
이 페이지는 회사가 어떤 일을 하는지 보여주는 첫 화면이에요.

방문한 사람이 "아, 이 회사 이런 거 하는구나" 알게 만드는 게 목적이에요.

---

## 페이지에 뭐가 있어요?

위에서 아래로 6개 부분이 차례로 나와요.

### 1. 맨 위 메뉴 (Navbar)

- 회사 로고 (ReboundX)
- 메뉴 3개: Terminal, Rebate, Labs
- **Get Started** 시작 버튼

### 2. 첫 화면 (Hero)

- 큰 제목: **Trade, Defined**
- 설명 문구
- **See the platform** 버튼

### 3. 짧은 메시지 (Sub-message)

세 줄짜리 광고 문구가 나와요.
- Trade together (함께 거래)
- Trade smarter (똑똑하게 거래)
- Trade simpler (간단하게 거래)

### 4. 제품 소개 (Product Features)

ReboundX의 제품 3개를 보여줘요.

**ReboundX Terminal**
- 여러 거래소(Bybit, OKX, Binance)를 한 화면에서 쓰는 도구
- 질문: "왜 탭을 여러 개 열고 거래해?"

**ReboundX Rebate**
- 거래할 때 낸 수수료를 돌려받는 서비스
- 36시간 안에 지갑으로 환급

**ReboundX Labs**
- 외국 거래소의 한국 진출을 돕는 서비스
- 법, 유통, 연결을 같이 풀어줌

### 5. 마무리 영역 (Pre-footer)

- 큰 문구: **ReboundX defines what trade can be**
- 버튼 2개
  - Start trading (거래 시작)
  - Partner with us (같이 일하기)

### 6. 맨 아래 (Footer)

- 회사 정보와 한 줄 설명
- SNS 링크: Telegram, X(트위터)
- 저작권 표시
- 페이지 링크 목록

---

## 어떻게 만들었어요?

웹사이트를 만드는 도구들을 조합해서 만들었어요.

| 도구 이름 | 역할 |
|---|---|
| React | 화면 부품을 조립하는 틀 |
| TypeScript | 코드 실수를 줄여주는 안전장치 |
| Vite | 코드를 빠르게 실행하는 엔진 |

폴더는 이렇게 나뉘어 있어요.

```
src/
├── pages/landing/      ← 페이지 전체 조립
├── Sections/           ← 큰 부분들 (Hero, Sub-message 등)
├── widgets/            ← 메뉴와 푸터
├── shared/             ← 여러 곳에서 쓰는 부품
└── app/                ← 화면 전체 처리
```

큰 부분(Sections)과 작은 부품(shared)을 나눠놓아서,
한 곳을 고쳐도 다른 곳이 망가지지 않아요.

---

## 모두를 위한 배려

이 페이지는 **장애가 있는 사람도 잘 쓸 수 있게** 만들어졌어요.

- **Skip to content**: 키보드만 쓰는 사람이 메뉴를 건너뛰고 본문으로 바로 갈 수 있어요.
- **prefers-reduced-motion**: 멀미를 잘 하는 사람은 컴퓨터 설정에서 "움직임 줄이기"를 켤 수 있어요. 그러면 페이지의 움직임이 멈춰요.
- **aria-label**: SNS 아이콘 같은 그림에도 글자 설명이 붙어 있어요. 시각장애인이 쓰는 화면 읽어주는 프로그램이 "Telegram 링크" 라고 읽어줄 수 있어요.
- **lang="en"**: 페이지가 영어라는 표시. 번역기가 자동으로 알아챌 수 있어요.

---

## 한 줄 요약

ReboundX의 첫인상을 만드는 페이지예요.
스크롤을 내리면 회사가 만든 제품 3개(Terminal, Rebate, Labs)를 차례로 볼 수 있어요.
**누구나 쓸 수 있는 것**을 중요하게 만들었어요.
