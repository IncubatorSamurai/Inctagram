import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const ColorPaletteOutlineIcon = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="color-palette">
        <path
          d="M19.54 5.07999C18.5374 4.08442 17.346 3.29914 16.0357 2.77023C14.7255 2.24133 13.3228 1.97946 11.91 1.99999C9.25785 1.99336 6.71167 3.04057 4.83162 4.91125C2.95157 6.78192 1.89164 9.32283 1.88501 11.975C1.87838 14.6272 2.92559 17.1733 4.79627 19.0534C6.66694 20.9334 9.20785 21.9934 11.86 22C12.4315 22.0097 12.99 21.8294 13.448 21.4873C13.9059 21.1452 14.2372 20.6608 14.39 20.11C14.4874 19.7122 14.4864 19.2967 14.3871 18.8995C14.2878 18.5022 14.0931 18.1351 13.82 17.83C13.7569 17.7581 13.7157 17.6696 13.7013 17.5751C13.6869 17.4805 13.7 17.3838 13.7389 17.2964C13.7779 17.209 13.8411 17.1346 13.921 17.0821C14.001 17.0296 14.0943 17.0011 14.19 17H15.84C17.393 17.0073 18.8912 16.4267 20.0338 15.375C21.1764 14.3233 21.8788 12.8782 22 11.33C22.0372 10.1756 21.8382 9.02578 21.4152 7.95105C20.9922 6.87632 20.3541 5.89932 19.54 5.07999ZM15.88 15H14.23C13.7481 14.9973 13.2758 15.1344 12.8704 15.3948C12.4649 15.6552 12.1437 16.0277 11.9457 16.467C11.7478 16.9063 11.6815 17.3937 11.7551 17.8699C11.8286 18.3462 12.0387 18.7908 12.36 19.15C12.4226 19.2131 12.4668 19.292 12.4879 19.3784C12.5091 19.4647 12.5063 19.5551 12.48 19.64C12.43 19.85 12.2 19.98 11.89 20C10.7543 19.9854 9.63477 19.7292 8.6058 19.2484C7.57682 18.7676 6.66202 18.0732 5.92225 17.2114C5.18248 16.3496 4.63469 15.3401 4.31532 14.2502C3.99595 13.1602 3.91233 12.0148 4.07001 10.89C4.35518 8.99994 5.29957 7.27162 6.73615 6.01073C8.17273 4.74983 10.0089 4.03759 11.92 3.99999H12C13.1309 3.98519 14.2532 4.197 15.3009 4.62293C16.3485 5.04887 17.3003 5.68031 18.1 6.47999C18.724 7.10439 19.2143 7.84935 19.541 8.66944C19.8676 9.48952 20.0238 10.3676 20 11.25C19.8965 12.2731 19.4186 13.2218 18.6581 13.9139C17.8977 14.6061 16.9083 14.9929 15.88 15Z"
          fill="currentColor"
        />
        <path
          d="M12 8C12.8284 8 13.5 7.32843 13.5 6.5C13.5 5.67157 12.8284 5 12 5C11.1716 5 10.5 5.67157 10.5 6.5C10.5 7.32843 11.1716 8 12 8Z"
          fill="currentColor"
        />
        <path
          d="M15.25 7.20001C14.9932 7.34837 14.7861 7.56954 14.6549 7.83557C14.5238 8.10159 14.4744 8.40053 14.5131 8.6946C14.5518 8.98866 14.6768 9.26465 14.8724 9.48768C15.0679 9.71072 15.3251 9.87078 15.6116 9.94764C15.8981 10.0245 16.2009 10.0147 16.4818 9.91949C16.7627 9.82428 17.0091 9.64793 17.1898 9.41272C17.3705 9.17752 17.4774 8.89403 17.497 8.59808C17.5166 8.30213 17.4481 8.007 17.3 7.75001C17.2016 7.57921 17.0705 7.42948 16.9142 7.30939C16.7578 7.18929 16.5794 7.10119 16.389 7.05011C16.1986 6.99903 16 6.98597 15.8046 7.0117C15.6091 7.03742 15.4207 7.10141 15.25 7.20001Z"
          fill="currentColor"
        />
        <path
          d="M8.74999 7.2C8.493 7.05193 8.19787 6.98336 7.90192 7.00298C7.60597 7.0226 7.32248 7.12951 7.08728 7.31021C6.85207 7.49091 6.67572 7.73728 6.58051 8.01819C6.4853 8.29909 6.47551 8.60192 6.55237 8.88839C6.62922 9.17486 6.78928 9.43211 7.01232 9.62764C7.23535 9.82316 7.51134 9.94817 7.8054 9.98687C8.09947 10.0256 8.39841 9.97623 8.66443 9.84507C8.93046 9.71391 9.15163 9.50683 9.29999 9.25C9.39859 9.07931 9.46258 8.89086 9.4883 8.69542C9.51403 8.49998 9.50097 8.30139 9.44989 8.111C9.39881 7.92061 9.31071 7.74216 9.19061 7.58584C9.07052 7.42953 8.92079 7.29841 8.74999 7.2Z"
          fill="currentColor"
        />
        <path
          d="M6.16 11.26C5.91396 11.4261 5.72276 11.6615 5.61059 11.9364C5.49842 12.2112 5.47033 12.5132 5.52988 12.804C5.58942 13.0949 5.73393 13.3615 5.9451 13.5701C6.15626 13.7788 6.4246 13.9201 6.71612 13.9762C7.00764 14.0322 7.30925 14.0005 7.58274 13.8851C7.85624 13.7696 8.08933 13.5756 8.25249 13.3276C8.41566 13.0796 8.50157 12.7888 8.49935 12.4919C8.49712 12.1951 8.40686 11.9055 8.24 11.66C8.13037 11.4964 7.98939 11.3561 7.8252 11.2472C7.66101 11.1384 7.47688 11.0632 7.28345 11.026C7.09002 10.9888 6.89113 10.9904 6.6983 11.0305C6.50546 11.0707 6.3225 11.1487 6.16 11.26Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
