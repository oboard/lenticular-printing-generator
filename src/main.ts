import { Canvas } from "./canvas";
import { Grid } from "./grid";
import { process } from "./process";
import { Slider } from "./slider";
import "./style.css";
import { Col, Input, Row, View, px, Image, Builder, State } from "buder";

const size = 512;
let canvas = Canvas(size, size);
let imageList = State([] as string[]);
export const gap = State("10");

function draw() {
  let ctx = canvas.context!;
  process(imageList.value, ctx);
  console.log(gap.value);
}
gap.subscribe(draw);
Row([
  Col([
    Slider(gap, { min: 1, max: 100, step: 0.1 }).style({ width: "100%" }),
    // upload
    Input()
      .attribute({ type: "file" })
      .event({
        change: function (e: Event) {
          let files = (e.target as HTMLInputElement).files;
          if (!files) return;
          var file = files[0]; // 获取文件引用
          var reader = new FileReader(); // 创建FileReader对象

          reader.onload = function (e) {
            // var img = new Image();
            // img.onload = function () {
            //   let ctx = canvas.context!;
            //   ctx.drawImage(img, 0, 0, size, size); // 绘制图片
            // };
            // 设置图片源
            imageList.value = [...imageList.value, e.target?.result as string];
            draw();
          };

          reader.readAsDataURL(file); // 读取文件
        },
      }),

    Builder(
      () =>
        Grid([
          // 展示图片
          ...imageList.value.map((img) => Image(img).style({ width: "100px" })),
        ]),
      [imageList]
    ).expand,
  ]),
  View([
    canvas.style({
      width: px(size),
      height: px(size),
    }),
  ]).expand,
])
  .style({
    width: "100vw",
    height: "100vh",
  })
  .mount("#app");
