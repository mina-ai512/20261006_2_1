// 儲存五道 p5.js 程式設計測驗題目
const questions = [
  // 第一題資料
  {
    // 設定第一題題目文字
    question: "在 p5.js 中，哪一個函式會在程式開始時執行一次？",

    // 設定第一題的四個選項
    options: ["draw()", "setup()", "start()", "init()"],

    // 設定正確答案索引
    answer: 1
  },

  // 第二題資料
  {
    // 設定第二題題目文字
    question: "在 p5.js 中，哪一個函式會持續重複執行？",

    // 設定第二題的四個選項
    options: ["loop()", "repeat()", "draw()", "update()"],

    // 設定正確答案索引
    answer: 2
  },

  // 第三題資料
  {
    // 設定第三題題目文字
    question: "下列哪一個指令可以建立畫布？",

    // 設定第三題的四個選項
    options: ["createCanvas()", "makeCanvas()", "newCanvas()", "canvas()"],

    // 設定正確答案索引
    answer: 0
  },

  // 第四題資料
  {
    // 設定第四題題目文字
    question: "在 p5.js 中，哪一個指令可以設定背景顏色？",

    // 設定第四題的四個選項
    options: ["color()", "background()", "fill()", "paint()"],

    // 設定正確答案索引
    answer: 1
  },

  // 第五題資料
  {
    // 設定第五題題目文字
    question: "在 p5.js 中，哪一個指令可以畫出圓形？",

    // 設定第五題的四個選項
    options: ["circle()", "ellipse()", "round()", "drawCircle()"],

    // 設定正確答案索引
    answer: 1
  }
];

// 儲存目前所在的題目索引
let currentQuestion = 0;

// 儲存答對的題目數量
let correctCount = 0;

// 儲存目前是否已經作答
let hasAnswered = false;

// 儲存使用者選擇的選項索引
let selectedOption = -1;

// 儲存所有選項的畫面區域
let optionAreas = [];

// 儲存下一題按鈕的畫面區域
let nextButtonArea = null;

// 儲存重新開始按鈕的畫面區域
let restartButtonArea = null;

// 儲存動畫開始時間
let animationStartTime = 0;

// 建立畫布
function setup() {
  // 建立符合瀏覽器視窗大小的畫布，並取得 p5.js 畫布物件
  const canvasElement = createCanvas(windowWidth, windowHeight);

  // 取得實際的 HTML canvas 元素
  const canvasDomElement = canvasElement.elt;

  // 設定觸控操作樣式
  canvasDomElement.style.touchAction = "manipulation";

  // 設定文字水平與垂直置中
  textAlign(CENTER, CENTER);

  // 設定矩形以中心點作為繪製基準
  rectMode(CENTER);

  // 設定畫布像素密度
  pixelDensity(1);
}

// 每一幀重新繪製畫面
function draw() {
  // 設定明亮背景顏色
  background("#f5f7ff");

  // 判斷是否已經完成全部題目
  if (currentQuestion >= questions.length) {
    // 繪製測驗結果畫面
    drawResultScreen();

    // 結束本次繪圖流程
    return;
  }

  // 繪製答題畫面
  drawQuizScreen();
}

// 取得安全的響應式尺寸
function getResponsiveSize() {
  // 確保畫布寬度至少為 1
  const safeWidth = max(width, 1);

  // 確保畫布高度至少為 1
  const safeHeight = max(height, 1);

  // 計算寬度縮放比例
  const widthScale = safeWidth / 900;

  // 計算高度縮放比例
  const heightScale = safeHeight / 900;

  // 取得寬度與高度中較小的縮放比例
  const scale = min(widthScale, heightScale);

  // 設定內容區域寬度
  const contentWidth = min(max(safeWidth - 40, 260), 900);

  // 回傳響應式尺寸資料
  return {
    // 回傳內容寬度
    contentWidth: contentWidth,

    // 回傳標題文字大小
    titleSize: constrain(32 * scale, 22, 32),

    // 回傳題數文字大小
    progressSize: constrain(18 * scale, 14, 18),

    // 回傳題目文字大小
    questionSize: constrain(23 * scale, 17, 23),

    // 回傳選項文字大小
    optionTextSize: constrain(20 * scale, 16, 20),

    // 回傳題目卡片高度
    questionCardHeight: constrain(130 * scale, 105, 130),

    // 回傳選項高度
    optionHeight: constrain(60 * scale, 50, 60),

    // 回傳選項間距
    optionGap: constrain(76 * scale, 62, 76),

    // 回傳畫面頂端間距
    topSpace: constrain(48 * scale, 28, 48)
  };
}

// 繪製答題畫面
function drawQuizScreen() {
  // 取得目前題目資料
  const quiz = questions[currentQuestion];

  // 取得響應式尺寸
  const size = getResponsiveSize();

  // 計算畫面中央水平位置
  const centerX = width / 2;

  // 設定主標題顏色
  fill("#222b55");

  // 設定主標題文字大小
  textSize(size.titleSize);

  // 顯示主標題
  text("p5.js 指令小測驗", centerX, size.topSpace);

  // 設定題數文字顏色
  fill("#65709c");

  // 設定題數文字大小
  textSize(size.progressSize);

  // 計算題數文字垂直位置
  const progressY = size.topSpace + size.titleSize + 22;

  // 顯示目前題數
  text(
    `第 ${currentQuestion + 1} 題／共 ${questions.length} 題`,
    centerX,
    progressY
  );

  // 計算題目卡片垂直位置
  const questionCardY =
    progressY + size.progressSize + size.questionCardHeight * 0.65;

  // 設定題目卡片陰影顏色
  fill(0, 0, 0, 18);

  // 繪製題目卡片陰影
  rect(
    centerX + 4,
    questionCardY + 5,
    size.contentWidth,
    size.questionCardHeight,
    18
  );

  // 設定題目卡片背景顏色
  fill("#ffffff");

  // 繪製題目卡片
  rect(
    centerX,
    questionCardY,
    size.contentWidth,
    size.questionCardHeight,
    18
  );

  // 設定題目文字顏色
  fill("#222b55");

  // 設定題目文字大小
  textSize(size.questionSize);

  // 顯示題目文字
  text(
    quiz.question,
    centerX,
    questionCardY,
    size.contentWidth - 45,
    size.questionCardHeight - 20
  );

  // 計算選項開始位置
  const optionsStartY =
    questionCardY +
    size.questionCardHeight / 2 +
    size.optionGap * 0.75;

  // 清除前一幀的選項區域
  optionAreas = [];

  // 逐一繪製四個選項
  for (let i = 0; i < quiz.options.length; i++) {
    // 計算目前選項的原始垂直位置
    let optionY = optionsStartY + i * size.optionGap;

    // 判斷是否需要讓正確選項上下跳動
    const shouldAnimate =
      hasAnswered &&
      selectedOption !== quiz.answer &&
      i === quiz.answer;

    // 如果需要動畫，就計算上下跳動位移
    if (shouldAnimate) {
      // 計算動畫經過時間
      const elapsed = millis() - animationStartTime;

      // 使用正弦函式產生上下跳動效果
      optionY += sin(elapsed * 0.012) * 10;
    }

    // 儲存目前選項的點擊區域
    optionAreas.push({
      // 設定選項中心水平座標
      x: centerX,

      // 設定選項中心垂直座標
      y: optionY,

      // 設定選項寬度
      width: size.contentWidth,

      // 設定選項高度
      height: size.optionHeight
    });

    // 設定選項按鈕陰影顏色
    fill(0, 0, 0, 16);

    // 繪製選項按鈕陰影
    rect(
      centerX + 3,
      optionY + 4,
      size.contentWidth,
      size.optionHeight,
      14
    );

    // 判斷目前選項是否為答錯時的正確選項
    const isCorrectHighlighted =
      hasAnswered &&
      selectedOption !== quiz.answer &&
      i === quiz.answer;

    // 判斷目前選項是否為使用者選擇的錯誤選項
    const isWrongSelected =
      hasAnswered &&
      selectedOption === i &&
      selectedOption !== quiz.answer;

    // 根據選項狀態設定按鈕背景顏色
    if (isCorrectHighlighted) {
      // 答錯時使用指定的綠色背景
      fill("#6a994e");
    } else if (isWrongSelected) {
      // 使用淡紅色標示錯誤選項
      fill("#ffd9df");
    } else if (
      hasAnswered &&
      selectedOption === quiz.answer &&
      i === quiz.answer
    ) {
      // 使用淡綠色標示答對選項
      fill("#b8e8c5");
    } else {
      // 使用白色作為一般選項背景
      fill("#ffffff");
    }

    // 繪製選項按鈕
    rect(
      centerX,
      optionY,
      size.contentWidth,
      size.optionHeight,
      14
    );

    // 判斷是否為深色背景
    if (isCorrectHighlighted) {
      // 綠色背景使用白色文字
      fill("#ffffff");
    } else {
      // 一般背景使用深藍色文字
      fill("#222b55");
    }

    // 設定選項文字大小
    textSize(size.optionTextSize);

    // 顯示選項編號與文字
    text(
      `${String.fromCharCode(65 + i)}. ${quiz.options[i]}`,
      centerX,
      optionY
    );
  }

  // 判斷是否已經作答
  if (hasAnswered) {
    // 顯示答題結果訊息
    drawAnswerMessage(
      centerX,
      optionsStartY + size.optionGap * 4.15,
      size
    );

    // 顯示下一題按鈕
    drawNextButton(
      centerX,
      optionsStartY + size.optionGap * 4.85,
      size
    );
  }
}

// 繪製答題結果提示文字
function drawAnswerMessage(centerX, messageY, size) {
  // 取得目前題目的正確答案索引
  const answerIndex = questions[currentQuestion].answer;

  // 判斷使用者是否答對
  const isCorrect = selectedOption === answerIndex;

  // 設定訊息顏色
  fill(isCorrect ? "#16834c" : "#b92548");

  // 設定訊息文字大小
  textSize(size.progressSize);

  // 顯示答對或答錯訊息
  text(
    isCorrect ? "答對了！" : "答錯了，正確答案已標示。",
    centerX,
    messageY
  );
}

// 繪製下一題按鈕
function drawNextButton(centerX, buttonY, size) {
  // 設定按鈕寬度
  const buttonWidth = min(size.contentWidth, 330);

  // 設定按鈕高度
  const buttonHeight = constrain(size.optionHeight, 52, 60);

  // 記錄下一題按鈕區域
  nextButtonArea = {
    // 設定按鈕中心水平座標
    x: centerX,

    // 設定按鈕中心垂直座標
    y: buttonY,

    // 設定按鈕寬度
    width: buttonWidth,

    // 設定按鈕高度
    height: buttonHeight
  };

  // 設定按鈕陰影顏色
  fill(0, 0, 0, 18);

  // 繪製按鈕陰影
  rect(centerX + 3, buttonY + 4, buttonWidth, buttonHeight, 16);

  // 設定按鈕背景顏色
  fill("#4c6fff");

  // 繪製下一題按鈕
  rect(centerX, buttonY, buttonWidth, buttonHeight, 16);

  // 設定按鈕文字顏色
  fill("#ffffff");

  // 設定按鈕文字大小
  textSize(size.progressSize + 2);

  // 判斷是否為最後一題
  const isLastQuestion = currentQuestion === questions.length - 1;

  // 顯示按鈕文字
  text(isLastQuestion ? "查看結果" : "下一題", centerX, buttonY);
}

// 繪製測驗結果畫面
function drawResultScreen() {
  // 取得響應式尺寸
  const size = getResponsiveSize();

  // 計算畫面中央水平位置
  const centerX = width / 2;

  // 設定結果卡片寬度
  const cardWidth = min(max(width - 40, 260), 620);

  // 設定結果卡片高度
  const cardHeight = min(max(height - 80, 300), 430);

  // 設定結果卡片垂直位置
  const cardY = height / 2;

  // 設定卡片陰影顏色
  fill(0, 0, 0, 18);

  // 繪製結果卡片陰影
  rect(centerX + 5, cardY + 6, cardWidth, cardHeight, 24);

  // 設定卡片背景顏色
  fill("#ffffff");

  // 繪製結果卡片
  rect(centerX, cardY, cardWidth, cardHeight, 24);

  // 設定結果標題顏色
  fill("#222b55");

  // 設定結果標題文字大小
  textSize(size.titleSize);

  // 顯示完成標題
  text("測驗完成！", centerX, cardY - 105);

  // 設定分數文字顏色
  fill("#4c6fff");

  // 設定分數文字大小
  textSize(constrain(size.titleSize * 1.5, 38, 48));

  // 顯示答對題數
  text(`${correctCount} / ${questions.length}`, centerX, cardY - 25);

  // 設定說明文字顏色
  fill("#65709c");

  // 設定說明文字大小
  textSize(size.progressSize + 2);

  // 顯示答對題數說明
  text(`你答對了 ${correctCount} 題`, centerX, cardY + 35);

  // 設定重新開始按鈕位置
  const restartY = cardY + min(115, cardHeight * 0.28);

  // 設定重新開始按鈕寬度
  const restartWidth = min(cardWidth - 60, 300);

  // 設定重新開始按鈕高度
  const restartHeight = constrain(size.optionHeight, 52, 60);

  // 記錄重新開始按鈕區域
  restartButtonArea = {
    // 設定按鈕中心水平座標
    x: centerX,

    // 設定按鈕中心垂直座標
    y: restartY,

    // 設定按鈕寬度
    width: restartWidth,

    // 設定按鈕高度
    height: restartHeight
  };

  // 設定重新開始按鈕背景顏色
  fill("#4c6fff");

  // 繪製重新開始按鈕
  rect(centerX, restartY, restartWidth, restartHeight, 16);

  // 設定按鈕文字顏色
  fill("#ffffff");

  // 設定按鈕文字大小
  textSize(size.progressSize + 2);

  // 顯示重新開始文字
  text("重新開始", centerX, restartY);
}

// 處理滑鼠與觸控按下事件
function mousePressed() {
  // 判斷是否已經完成測驗
  if (currentQuestion >= questions.length) {
    // 判斷是否點擊重新開始按鈕
    if (isInsideArea(mouseX, mouseY, restartButtonArea)) {
      // 重新開始測驗
      restartQuiz();
    }

    // 結束事件處理
    return false;
  }

  // 判斷目前是否尚未作答
  if (!hasAnswered) {
    // 逐一檢查所有選項
    for (let i = 0; i < optionAreas.length; i++) {
      // 判斷是否點擊目前選項
      if (isInsideArea(mouseX, mouseY, optionAreas[i])) {
        // 記錄選擇的選項
        selectedOption = i;

        // 設定題目已經作答
        hasAnswered = true;

        // 判斷選項是否正確
        if (selectedOption === questions[currentQuestion].answer) {
          // 增加答對題數
          correctCount++;
        }

        // 記錄動畫開始時間
        animationStartTime = millis();

        // 結束選項檢查
        break;
      }
    }
  } else {
    // 判斷是否點擊下一題按鈕
    if (isInsideArea(mouseX, mouseY, nextButtonArea)) {
      // 進入下一題
      currentQuestion++;

      // 重設作答狀態
      hasAnswered = false;

      // 清除目前選擇的選項
      selectedOption = -1;
    }
  }

  // 避免觸控裝置觸發額外瀏覽器操作
  return false;
}

// 判斷座標是否位於指定區域內
function isInsideArea(x, y, area) {
  // 判斷區域是否存在
  if (!area) {
    // 區域不存在時回傳 false
    return false;
  }

  // 判斷座標是否在區域內
  return (
    x >= area.x - area.width / 2 &&
    x <= area.x + area.width / 2 &&
    y >= area.y - area.height / 2 &&
    y <= area.y + area.height / 2
  );
}

// 重新開始測驗
function restartQuiz() {
  // 回到第一題
  currentQuestion = 0;

  // 將答對題數歸零
  correctCount = 0;

  // 設定為尚未作答
  hasAnswered = false;

  // 清除選擇的選項
  selectedOption = -1;

  // 清除下一題按鈕區域
  nextButtonArea = null;

  // 清除重新開始按鈕區域
  restartButtonArea = null;
}

// 當視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 設定畫布像素密度
  pixelDensity(1);
}