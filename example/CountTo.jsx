import React, { useEffect,useState } from 'react';
import Circle from '../src';
const gradientColor = {
    'color-urgent': ['#EB6A53', '#EE8226'],
    'color-strong': ['#EE8226', '#F4A827'],
    'color-medium': ['#F4A827', '#FFBE4F'],
    'color-mild': ['#FFBE4F', '#52CA8A'],
    'color-ok': ['#52CA8A', '#66F1A7'],
}
const CountTo=(props)=>{
    const [num,setNumber]=useState(0)
    const [count,setCount]=useState(0)
    useEffect(()=>{

        const interval=setInterval(()=>{
            if (num!=11){
                setNumber(num+1)
                setCount(Number(parseFloat(props.to*num*0.1).toFixed(2)))
            }
        },0)

        return ()=>clearInterval(interval)
    });

    return <Circle size='48' lineWidth="30" textColor="#bcbcbc" bgColor="#afafaf" name={props.colorStyle} processGradient={gradientColor[props.colorStyle]} progress={ count}/>
}
CountTo.defaultProps={
    to:90,
    colorStyle:'name'
}
export default CountTo;
