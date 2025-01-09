import { useEffect, useRef, useState } from 'react';
import './Analitics.css'
import InfoHeader from './InfoHeader'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarController, BarElement, LinearScale, PointElement, LineElement, Filler } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from 'axios';
import useHook from '../Hooks/Hooks';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

import TopUsers from './TopUsers';

import chartsPng from '../assets/chart.png'

const Analitics = ()=>{

    const[statistic, setStatistic] = useState({})
    const[isLoading, setIsLoading] = useState(true)
    const [top, setTop]= useState({})
    const {storage} = useHook()
    const [userss, setUserss] = useState([]);

    const [activeNav, setActiveNav] = useState("1")

    const firstLink = "1";
    const refNav = useRef(null)


    const SetColor =()=>{
            if(activeNav == firstLink){
                refNav.current.style.background = '#FFF';
                refNav.current.style.color = "#000"
            }

    }


    useEffect(()=>{

        ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, BarController, BarElement, LinearScale, PointElement, LineElement, Filler);

        const Fetch = async()=>{
            try{
                let response = await axios.get(`http://127.0.0.1:8000/getStatisticMessage/${storage}/`)
                setStatistic(response.data)
                setTop(response.data.top6)
                setTimeout(()=>{
                    setIsLoading(false)
                }, 1000)
                const resp = await axios.get('http://127.0.0.1:8000/topUsers/');
                if (resp.data && resp.data.length > 0) {
                    // Сортировка пользователей сразу после получения данных
                    const sortedUsers = bubbleSort(resp.data);
                    setUserss(sortedUsers);
                }
            }
            catch(error){
                console.log(error)
            }        

        }
        Fetch()

    }, [])

    const bubbleSort = (array) => {
        const sortedArray = [...array]; // Создаем копию массива
        let temp;
        for (let i = 0; i < sortedArray.length; i++) {
            for (let j = i + 1; j < sortedArray.length; j++) {
                if (sortedArray[i].count < sortedArray[j].count) {
                    temp = sortedArray[i];
                    sortedArray[i] = sortedArray[j];
                    sortedArray[j] = temp;
                }
            }
        }
        return sortedArray;
    };

    // useEffect(()=>{
    //     if(refNav.current){
    //         if(activeNav == firstLink){
    //             refNav.current.style.color = "#000"
    //             refNav.current.style.background = "#fff"
    //         }
    //     }
    // }, [])

    if (isLoading == true) return <Loading />
    return(

        <div className="main-chart-window">
            <InfoHeader />
            <div className="chart-blocks">
                <aside className="chartAside">
                    <div className="chart-aside-header"><h1>Statistics</h1></div>

                    <div className="aside-block-nav">

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div> </div> */}
                            <Link to="" ref={refNav} className='aside-link'  onClick={()=>{setActiveNav("1")}}>Messages period</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div></div> */}
                            <Link to=""  className='aside-link' onClick={()=>{setActiveNav("2")}}>Your top rooms</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div></div> */}
                            <Link to=""  className='aside-link' onClick={()=>{setActiveNav("3")}} > Sent/Received</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                        <div className="aside-block-link">
                            {/* <div className="block-triangelll"><div className="right-triangle"></div></div> */}
                            <Link to=""  className='aside-link' onClick={()=>{setActiveNav("4")}}>Global top users</Link>
                            {/* <div className="block-triangelll"><div className="left-triangle"></div></div> */}
                        </div>

                    </div>
                </aside>
                <main className="chart-main-block">
                    <div className="chart-main-header">
                        <div className="chart-logo" style={{backgroundImage: `url(${chartsPng})`}}></div>
                    </div>
                    <div className="mainChart-block">

                        {activeNav === "1" && (
                            <div id="1" className="chart-container">
                                <div className="chart-container-header">
                                    Statistics of sent messages for the period <ion-icon name="stats"></ion-icon>
                                </div>
                                <div className="chart-container-block">
                                    <div className="diagrams-content">
                                        <div className="line-chart-content">
                                            <Line
                                                id='1'
                                                data={{
                                                    labels: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
                                                    datasets: [{
                                                        data: [1500, 564, 543, 2300, 4343, 2341, 3500, 516, 342, 4324, 2323, 3432],
                                                        backgroundColor: [
                                                            'rgb(50, 196, 149)',
                                                            'rgb(229, 13, 191)',
                                                        ],
                                                        borderColor: 'rgb(50, 196, 149)', // Цвет линии
                                                        borderWidth: 2,
                                                        fill: true,
                                                        pointRadius: 0, // Убираем точки
                                                    }],
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeNav === "2" && (
                            <div id="2" className="chart-container">
                                <div className="chart-container-header">
                                    Your top chat rooms <ion-icon name="stats"></ion-icon>
                                </div>
                                <div className="chart-container-block">
                                    <div className="diagrams-content">
                                        <div className="chart-containerss">
                                            <Bar
                                                id='3'
                                                data={{
                                                    labels: ['1', '2', '3', '4', '5', '6'],
                                                    datasets: [{
                                                        data: [top.One, top.Two, top.Three, top.Four, top.Five, top.Six],
                                                        backgroundColor: [
                                                            'rgb(196, 50, 50)',
                                                            '#FF0000',
                                                            '#BF3030',
                                                            '#A60000',
                                                            '#FF4040',
                                                            '#FF7373'
                                                        ],
                                                    }],
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeNav === "3" && (
                            <div id="3" className="chart-container">
                                <div className="chart-container-header">
                                    Statistics Sent/Received messages <ion-icon name="stats"></ion-icon>
                                </div>
                                <div className="chart-container-block">
                                    <div className="diagrams-content">
                                        <div className="contentDia">
                                            <Doughnut
                                                id='2'
                                                data={{
                                                    labels: ['sent', 'received'],
                                                    datasets: [{
                                                        data: [statistic.sent, statistic.received],
                                                        backgroundColor: [
                                                            '#FF7400',
                                                            '#FF9640',
                                                        ],
                                                    }],
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeNav === "4" && (
                            <div id="1" className="chart-container">
                                <div className="chart-container-header">
                                    Global top most active users <ion-icon name="stats"></ion-icon>
                                </div>
                                <div className="chart-container-block">
                                    <div className="diagrams-content">
                                        <TopUsers userss={userss} />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
                
            </div>
        </div>
    )
}

export default Analitics