import clsx from "clsx";
import * as React from "react";
import { SVGProps } from "react";

const MySQL = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
    className={clsx("dark:text-gray-0 text-[#00758F]", props.className)}
  >
    <g fill="currentColor" clipPath="url(#mysql-a)">
      <path d="M22.099 18.437c-1.305-.033-2.317.098-3.165.457-.244.097-.636.098-.669.407.13.13.147.343.261.522.196.326.539.767.849.995.342.261.685.522 1.043.75.637.392 1.354.62 1.974 1.012.36.228.718.522 1.077.766.179.13.293.343.522.424v-.048c-.115-.147-.147-.36-.261-.522-.163-.163-.327-.31-.49-.473a7.736 7.736 0 0 0-1.696-1.648c-.522-.359-1.664-.848-1.876-1.451l-.032-.033c.358-.033.782-.163 1.125-.261.555-.147 1.06-.114 1.631-.261.261-.065.522-.147.783-.228v-.147c-.294-.294-.506-.685-.816-.962a21.738 21.738 0 0 0-2.69-2.007c-.506-.326-1.159-.538-1.697-.815-.196-.098-.522-.147-.636-.31-.294-.359-.457-.832-.669-1.256a41.208 41.208 0 0 1-1.338-2.838c-.293-.636-.472-1.272-.831-1.86-1.68-2.772-3.507-4.452-6.312-6.1-.604-.342-1.322-.489-2.088-.668-.408-.017-.816-.05-1.224-.066-.26-.114-.522-.424-.75-.57C3.194.657.797-.615.112 1.065c-.44 1.06.652 2.104 1.027 2.642.278.376.636.8.832 1.224.114.277.147.57.261.864.261.718.506 1.517.848 2.186.18.342.375.701.604 1.011.13.18.359.261.408.555-.229.326-.245.815-.376 1.223-.587 1.843-.358 4.127.473 5.48.261.408.881 1.305 1.713.963.734-.294.57-1.224.783-2.04.049-.195.016-.325.114-.456v.033c.228.456.457.897.669 1.354.505.799 1.386 1.63 2.12 2.185.392.294.702.8 1.19.979v-.05h-.032c-.098-.146-.245-.211-.375-.326a7.904 7.904 0 0 1-.848-.978C8.838 17 8.234 15.99 7.696 14.946c-.26-.505-.49-1.06-.701-1.565-.098-.196-.098-.49-.261-.588-.245.36-.604.67-.783 1.11-.31.7-.343 1.565-.457 2.462-.065.017-.032 0-.065.033-.522-.13-.701-.669-.897-1.125-.49-1.158-.571-3.018-.147-4.355.114-.343.604-1.42.408-1.746-.098-.31-.424-.489-.604-.733a6.572 6.572 0 0 1-.587-1.044c-.391-.914-.587-1.925-1.011-2.838-.196-.425-.538-.865-.816-1.256-.31-.44-.652-.75-.897-1.273C.797 1.85.683 1.555.813 1.36c.033-.13.098-.18.228-.212.212-.18.816.049 1.028.146.603.245 1.11.473 1.615.816.228.163.473.473.766.555h.343c.522.114 1.109.032 1.598.179.865.277 1.648.685 2.35 1.125a14.47 14.47 0 0 1 5.088 5.579c.196.375.277.717.457 1.109.342.799.766 1.614 1.109 2.397.342.767.668 1.55 1.158 2.186.244.342 1.223.522 1.663.701.327.147.832.278 1.126.457.555.342 1.109.734 1.631 1.11.261.195 1.076.603 1.126.929Z" />
      <path d="M5.454 4.097c-.277 0-.472.034-.668.083v.033h.033c.13.266.358.448.521.68.13.265.245.53.375.795l.033-.033c.228-.166.342-.43.342-.829-.098-.115-.114-.231-.196-.347-.097-.166-.31-.25-.44-.382Z" />
    </g>
    <defs>
      <clipPath id="mysql-a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default MySQL;
