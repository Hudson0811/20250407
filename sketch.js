let menu;
let subMenu; // 子選單容器
let balls = []; // 多個彈跳球物件
let trailLayer; // 拖尾圖層
let floatingBalls = []; // 浮現球的效果

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 初始化拖尾圖層
  trailLayer = createGraphics(windowWidth, windowHeight);
  trailLayer.clear(); // 確保拖尾圖層是透明的

  // 初始化多個彈跳球
  for (let i = 0; i < 20; i++) {
    balls.push(new Ball(random(width), random(height), random(20, 50), random(2, 5), random(2, 5)));
  }

  // 建立選單按鈕
  createMenu();
}

function draw() {
  // 清除畫布，保持透明背景
  clear();

  // 更新拖尾圖層（逐漸淡出）
  trailLayer.fill(0, 0, 0, 50); // 使用透明黑色覆蓋，製造淡出效果
  trailLayer.rect(0, 0, width, height);

  // 更新並顯示所有彈跳球
  for (let ball of balls) {
    ball.update();
    ball.display();

    // 繪製拖尾到拖尾圖層
    trailLayer.fill(ball.color);
    trailLayer.ellipse(ball.x, ball.y, ball.r * 2);

    // 檢查滑鼠是否在球上
    if (dist(mouseX, mouseY, ball.x, ball.y) < ball.r) {
      ball.accelerate(2); // 當滑鼠在球上時，球加速 2 秒
    }
  }

  // 顯示拖尾圖層
  image(trailLayer, 0, 0);

  // 滑鼠互動效果：隨滑鼠移動產生光暈
  fill(255, 255, 255, 150); // 提高光暈透明度
  ellipse(mouseX, mouseY, 100, 100); // 放大光暈尺寸

  // 更新並顯示浮現球效果
  updateFloatingBalls();
}

function updateFloatingBalls() {
  // 新增一個浮現球
  if (frameCount % 10 === 0) { // 每 10 幀新增一個浮現球
    floatingBalls.push({
      x: random(width),
      y: random(height),
      r: random(20, 50),
      color: color(random(150, 255), random(150, 255), random(150, 255), 180) // 半透明顏色
    });

    // 如果浮現球超過 10 個，刪除最舊的一個
    if (floatingBalls.length > 10) {
      floatingBalls.shift();
    }
  }

  // 繪製所有浮現球
  for (let fb of floatingBalls) {
    fill(fb.color);
    ellipse(fb.x, fb.y, fb.r * 2);
  }
}

function createMenu() {
  // 建立選單容器
  menu = createDiv();
  menu.id('menu');
  menu.style('position', 'absolute');
  menu.style('top', '20px');
  menu.style('left', '20px');
  menu.style('background', 'rgba(255, 255, 255, 0.9)'); // 更高透明度的背景
  menu.style('padding', '10px');
  menu.style('border-radius', '8px');
  menu.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
  menu.style('z-index', '10'); // 確保選單在最上層

  // 新增首頁按鈕
  let homeButton = createButton('首頁').parent(menu);
  homeButton.style('width', '120px'); // 設定按鈕寬度
  homeButton.style('height', '40px'); // 設定按鈕高度
  homeButton.style('margin-bottom', '5px'); // 增加按鈕間距
  homeButton.style('font-size', '16px'); // 調整字體大小
  homeButton.mousePressed(() => alert('回到首頁！')); // 回到首頁的功能

  // 新增自我介紹按鈕
  let introButton = createButton('自我介紹').parent(menu);
  introButton.style('width', '120px');
  introButton.style('height', '40px');
  introButton.style('margin-bottom', '5px');
  introButton.style('font-size', '16px');
  introButton.mousePressed(() => alert('這是自我介紹的內容！'));

  // 新增教學影片按鈕
  let videoButton = createButton('教學影片').parent(menu);
  videoButton.style('width', '120px');
  videoButton.style('height', '40px');
  videoButton.style('margin-bottom', '5px');
  videoButton.style('font-size', '16px');
  videoButton.mousePressed(() => alert('這是教學影片的內容！'));

  // 新增筆記按鈕
  let notesButton = createButton('筆記').parent(menu);
  notesButton.style('width', '120px');
  notesButton.style('height', '40px');
  notesButton.style('margin-bottom', '5px');
  notesButton.style('font-size', '16px');
  notesButton.mousePressed(() => alert('這是筆記的內容！'));

  // 建立子選單容器（預設隱藏）
  subMenu = createDiv();
  subMenu.id('subMenu');
  subMenu.style('position', 'absolute');
  subMenu.style('top', '0px'); // 子選單初始位置
  subMenu.style('left', '0px'); // 與父容器對齊
  subMenu.style('background', 'rgba(255, 255, 255, 0.9)');
  subMenu.style('padding', '5px');
  subMenu.style('border-radius', '8px');
  subMenu.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
  subMenu.style('display', 'none'); // 預設隱藏
  subMenu.style('z-index', '11'); // 確保子選單在選單上方

  // 子選單按鈕
  let button1 = createButton('淡江大學').parent(subMenu);
  button1.style('width', '120px'); // 放大按鈕寬度
  button1.style('margin-bottom', '5px'); // 增加按鈕間距
  button1.mousePressed(() => alert('這是淡江大學的內容！'));

  let button2 = createButton('作品集').parent(subMenu);
  button2.style('width', '120px'); // 放大按鈕寬度
  button2.mousePressed(() => alert('這是作品集的內容！'));

  // 將子選單綁定到「作品」按鈕
  let portfolioButton = createButton('作品').parent(menu);
  portfolioButton.style('width', '120px'); // 與「自我介紹」按鈕寬度一致
  portfolioButton.style('height', '40px'); // 與「自我介紹」按鈕高度一致
  portfolioButton.style('margin-bottom', '5px'); // 增加按鈕間距
  portfolioButton.style('font-size', '16px'); // 調整字體大小

  // 顯示子選單
  portfolioButton.mouseOver(() => {
    subMenu.style('display', 'block');
    subMenu.style('top', `${portfolioButton.elt.offsetTop + portfolioButton.elt.offsetHeight}px`); // 將子選單顯示在按鈕下方
    subMenu.style('left', `${portfolioButton.elt.offsetLeft}px`); // 將子選單與按鈕對齊
  });

  // 隱藏子選單
  portfolioButton.mouseOut(() => {
    setTimeout(() => {
      if (!subMenu.matches(':hover')) {
        subMenu.style('display', 'none');
      }
    }, 200); // 延遲隱藏，避免滑鼠快速移動導致子選單消失
  });

  // 子選單保持顯示
  subMenu.mouseOver(() => subMenu.style('display', 'block'));
  subMenu.mouseOut(() => subMenu.style('display', 'none'));

  // 新增測驗卷按鈕
  let quizButton = createButton('測驗卷').parent(menu);
  quizButton.style('width', '120px'); // 與其他按鈕寬度一致
  quizButton.style('height', '40px'); // 與其他按鈕高度一致
  quizButton.style('margin-bottom', '5px'); // 增加按鈕間距
  quizButton.style('font-size', '16px'); // 調整字體大小
  quizButton.mousePressed(() => {
    // 嵌入 iframe
    let iframeContainer = createDiv();
    iframeContainer.style('position', 'fixed'); // 使用 fixed 讓 iframe 固定在視窗中
    iframeContainer.style('top', '50%'); // 設置 iframe 的位置為視窗中間
    iframeContainer.style('left', '50%');
    iframeContainer.style('transform', 'translate(-50%, -50%)'); // 將容器中心對齊
    iframeContainer.style('width', '80%'); // 設置寬度為視窗的 80%
    iframeContainer.style('height', '80%'); // 設置高度為視窗的 80%
    iframeContainer.style('background', 'white');
    iframeContainer.style('border', '1px solid #ccc');
    iframeContainer.style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.2)');
    iframeContainer.style('z-index', '20'); // 確保 iframe 在最上層

    let iframe = createElement('iframe');
    iframe.attribute('src', 'https://hudson0811.github.io/20250310/');
    iframe.attribute('width', '100%');
    iframe.attribute('height', '100%');
    iframe.attribute('frameborder', '0');
    iframe.parent(iframeContainer);

    // 新增關閉按鈕
    let closeButton = createButton('關閉').parent(iframeContainer);
    closeButton.style('position', 'absolute');
    closeButton.style('top', '10px');
    closeButton.style('right', '10px');
    closeButton.style('padding', '10px 20px');
    closeButton.style('background', '#f44336');
    closeButton.style('color', 'white');
    closeButton.style('border', 'none');
    closeButton.style('border-radius', '5px');
    closeButton.style('cursor', 'pointer');
    closeButton.style('z-index', '21');
    closeButton.mousePressed(() => iframeContainer.remove());
  });
}

// 彈跳球類別
class Ball {
  constructor(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color(random(255), random(255), random(255), 200); // 隨機顏色
    this.accelerationTimer = 0; // 加速計時器
  }

  update() {
    // 如果加速計時器大於 0，則加速
    if (this.accelerationTimer > 0) {
      this.accelerationTimer--;
    } else {
      this.dx = constrain(this.dx, -5, 5); // 恢復到原始速度範圍
      this.dy = constrain(this.dy, -5, 5);
    }

    this.x += this.dx;
    this.y += this.dy;

    // 碰撞邊界反彈
    if (this.x - this.r < 0 || this.x + this.r > width) {
      this.dx *= -1;
    }
    if (this.y - this.r < 0 || this.y + this.r > height) {
      this.dy *= -1;
    }
  }

  display() {
    // 繪製球
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
  }

  accelerate(seconds) {
    this.dx *= 1.5; // 加速
    this.dy *= 1.5;
    this.accelerationTimer = frameRate() * seconds; // 設置加速持續時間
  }
}
