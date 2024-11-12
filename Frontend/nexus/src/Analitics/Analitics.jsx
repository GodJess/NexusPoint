import { useEffect, useState } from 'react';
import './Analitics.css'
import InfoHeader from './InfoHeader'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarController, BarElement, LinearScale, PointElement, LineElement, Filler } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import axios from 'axios';
import useHook from '../Hooks/Hooks';
import Loading from '../Loading/Loading';

const Analitics = ()=>{

    const[statistic, setStatistic] = useState({})
    const[isLoading, setIsLoading] = useState(true)
    const [top, setTop]= useState({})
    const {storage} = useHook()

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
            }
            catch(error){
                console.log(error)
            }        
        }
        Fetch()

    }, [])
    if (isLoading == true) return <Loading />
    return(

        <div className="main-chart-window">
            <InfoHeader />
            <div className="chart-blocks">
                <div className="block-diagrams first">
                    <div className="diagrams-fields first">
                        <div className="diagrams-headers"><p>Statistics of sent messages for the period <ion-icon name="stats"></ion-icon></p></div>
                        <div className="diagrams-content">
                        <div className="line-chart-content">
                                <Line 
                                    id='1'
                                    data={{
                                        labels: ["jan", "fed", "mar", "apr", "may", "jun", "jul", "aug", "spt", "oct", "nov", "des"],
                                        datasets:[{

                                        data: [1500, 564, 543, 2300, 4343, 2341, 3500, 516, 342, 4324, 2323, 3432],
                                        backgroundColor:[
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
                <div className="block-diagrams">
                    <div className="diagrams-fields second">
                        <div className="diagrams-headers"><p>Statistics Sent/Received messages <ion-icon name="stats"></ion-icon></p></div>
                        <div className="diagrams-content">
                            <div className="contentDia">
                            <Doughnut  
                                id='2'
                                data={{
                                    labels: ['sent', 'received'],
                                    datasets:[{
                                    data: [statistic.sent , statistic.received],
                                    backgroundColor:[
                                        'rgb(50, 196, 149)',
                                        'rgb(229, 13, 191)',
                                    ],
                                    }],
                                }}
                                />
                            </div>
                                
                        </div>       
                    </div>
                </div>
                <div className="block-diagrams">
                    <div className="diagrams-fields fird">
                        <div className="diagrams-headers"><p>Your top chat rooms <ion-icon name="stats"></ion-icon></p></div>
                        <div className="diagrams-content">
                            <div className="chart-container">
                            <Bar 
                                id='3'
                                    data={{
                                        labels: ['1', '2', '3', '4', '5', '6'],
                                        datasets:[{
                                            data: [top.One, top.Two, top.Three, top.Four, top.Five, top.Six],
                                            backgroundColor:[
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
            </div>
        </div>
    )
}

export default Analitics