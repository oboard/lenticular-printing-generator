import { Canvas } from "./canvas";
import { Grid } from "./grid";
import { process } from "./process";
import { Slider } from "./slider";
import "./style.css";
import { Col, Input, Row, View, Image, Builder, State, Text } from "buder";

export const height = State(10);
const width = State(10);
let canvas = Canvas(width.value, height.value);
let imageList = State([] as string[]);
export const lpi = State(10);

function draw() {
  let ctx = canvas.context!;
  ctx.canvas.width = width.value * 256;
  ctx.canvas.height = height.value * 256;
  process(imageList.value, ctx);
  console.log(lpi.value);
}
lpi.subscribe(draw);
width.subscribe(draw);
height.subscribe(draw);
imageList.subscribe(draw);
Row([
  Col([
    Text("width(inch):"),
    Slider(width, { min: 1, max: 10, step: 0.1 }).style({ width: "100%" }),
    Text(width),
    Text("height(inch):"),
    Slider(height, { min: 1, max: 10, step: 0.1 }).style({ width: "100%" }),
    Text(height),
    Text("lpi:"),
    Slider(lpi, { min: 1, max: 100, step: 0.1 }).style({ width: "100%" }),
    Text(lpi),
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
          ...imageList.value.map((img) =>
            Image(img)
              .style({ width: "100px" })
              .event({
                click: function (_: Event) {
                  imageList.value = imageList.value.filter((i) => i !== img);
                  draw();
                },
              })
          ),
        ]),
      [imageList]
    ).expand,
  ]),
  View([
    canvas.style({
      width: width.value + "in",
      height: height.value + "in",
    }),
  ]).expand,
])
  .style({
    width: "100vw",
    height: "100vh",
  })
  .mount("#app");
