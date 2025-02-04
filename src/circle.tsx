import * as React from 'react';
import {Component, CSSProperties} from 'react';

export interface CircleProps {
    progress: number;
    animate?: boolean;
    animationDuration?: string;
    showPercentage?: boolean;
    showPercentageSymbol?: boolean;
    progressColor?: string;
    processGradient?: [string | null],
    name?: string,
    bgColor?: string;
    textColor?: string;
    size?: string;
    lineWidth?: string;
    percentSpacing?: number;
    textStyle?: CSSProperties;
    roundedStroke?: boolean;
    responsive?: boolean;

    onAnimationEnd?(): void;
}

export interface CircleState {

}

const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);
const getOffset = (val = 0) => Math.round((100 - Math.min(val, 100)) / 100 * diameter);

export class Circle extends Component<CircleProps, CircleState> {
    static defaultProps: CircleProps = {
        progress: 0,
        animate: true,
        animationDuration: '1s',
        showPercentage: true,
        showPercentageSymbol: true,
        progressColor: 'rgb(76, 154, 255)',
        processGradient: ['#sss'],
        name: '',
        bgColor: '#ecedf0',
        textColor: '#6b778c',
        size: '100',
        lineWidth: '25',
        percentSpacing: 10,
        textStyle: {font: 'bold 4rem Helvetica, Arial, sans-serif'}
    }

    get text() {
        const {progress, showPercentage, textColor, textStyle, percentSpacing, showPercentageSymbol} = this.props;
        if (!showPercentage) return;

        return (
            <text style={textStyle} fill={textColor} x={radius} y={radius} textAnchor="middle" dominantBaseline="central">
                {progress}{showPercentageSymbol && <tspan dx={percentSpacing}>%</tspan>}
            </text>
        );
    }

    render() {
        const {text} = this;
        const {progress, size, bgColor, progressColor, processGradient, name, lineWidth, animate, animationDuration, roundedStroke, responsive, onAnimationEnd} = this.props;
        const strokeDashoffset = getOffset(progress);
        const transition = animate ? `stroke-dashoffset ${animationDuration} ease-out` : undefined;
        const strokeLinecap = roundedStroke ? 'round' : 'butt';
        const svgSize = responsive ? '100%' : size;

        return (
            <svg width={svgSize} height={svgSize} viewBox="-25 -25 400 400">

                <linearGradient x1="1" y1="0" x2="0" y2="0" id={`g${name}`}>
                    {processGradient ? processGradient.map((item, index) => {
                        return <stop key={index} offset={100 * index / processGradient.length * 0.01} stop-color={item}></stop>
                    }) : null
                    }
                </linearGradient>

                <circle stroke={bgColor} cx="175" cy="175" r="175" strokeWidth={lineWidth} fill="none"/>
                <circle stroke={progressColor ? progressColor : `url('#g${name}')`} transform="rotate(-90 175 175)" cx="175" cy="175" r="175" strokeDasharray="1100" strokeWidth={lineWidth}
                        strokeDashoffset="1100" strokeLinecap={strokeLinecap} fill="none" style={{strokeDashoffset, transition}} onTransitionEnd={onAnimationEnd}/>
                {text}
            </svg>
        );
    }
}
