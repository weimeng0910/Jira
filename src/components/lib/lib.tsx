/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * CSS-IN-JS
 */
//引入Emotion
import styled from '@emotion/styled';

//创建CSS组件
export const Row = styled.div<{
    gap?: number | boolean; //定义props中携带的属性
    between?: boolean;
    marginBottonm?: number;
}>`
    display: flex;
    /* 为了使我们的盒子居中，通过align-items属性，可以将交叉轴上的 item 对齐 */
    align-items: center;
    //props的between属性要在传入的泛型中定义类型
    justify-content: ${props => (props.between ? 'space-between' : undefined)};
    margin-bottom: ${props => `${props.marginBottonm}rem`};
    /* 子元素的 margin-top bottom 会影响垂直居中，所以下面设置 优先级*/
    > * {
        margin-top: 0 !important;
        margin-right: ${props =>
            typeof props.gap === 'number' ? `${props.gap}rem` : props.gap ? '2rem' : undefined};
        margin-bottom: 0 !important;
    }
`;
