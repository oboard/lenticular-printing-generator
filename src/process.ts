import { height, lpi } from "./main";

export function process(imageList: string[], ctx: CanvasRenderingContext2D) {
  // 绘制所有图片到画布上
  let len = imageList.length;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < len; i++) {
    let img = new Image();
    img.src = imageList[i];
    img.onload = function () {
      ctx.restore();
      ctx.save();

      ctx.globalCompositeOperation = "destination-over";
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
      if (i === len - 1) {
        return;
      }
      // 使用screen
      ctx.globalCompositeOperation = "destination-out";
      //   绘制黑线，按照gap的宽度
      ctx.fillStyle = "black";
      const gapNumber = ctx.canvas.height / Number(lpi.value) / height.value * len;
      for (let y = 0; y < ctx.canvas.height; y += gapNumber) {
        ctx.fillRect(
          0,
          y + (i * gapNumber) / len,
          ctx.canvas.width,
          gapNumber / len
        );
      }
      // 绘制图片，拉伸到canvas的大小
      console.log(
        0,
        0,
        img.naturalWidth,
        img.naturalHeight,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
    };
  }
}
