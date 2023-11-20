import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from './api/axios';

import './customStyle.css';
const Calendar = () => {
    const navigate = useNavigate();
    
    
    const [calendarText, setCalendarText] = useState('');
    const [monthYearText, setMonthYearText] = useState('');

    const [inputValue, setInputValue] = useState('');
    const [isShowYearCalendar, setIsShowYearCalendar] = useState(false);
    const [isShowMonthCalendar, setIsShowMonthCalendar] = useState(true);

    const [selectedOption, setSelectedOption] = useState('option1');
    
    const [month, setMonth] = useState(10);
    const [year, setYear] = useState(2023);

    const fetchCalendarText = async () => {
        let month = new URLSearchParams(window.location.search).get('month');
        let year = new URLSearchParams(window.location.search).get('year');
        if(!year){
            year = 2023;
        }

        try {
            const response = await axios.get(`/calendar?year=${year}`, { responseType: 'text' });
            setCalendarText(response?.data || '');
        } catch (error) {
            console.error(`Error fetching calendar text: ${error.message}`);
        }
        
        if(month != null){
try {
    const response = await axios.get(`/calendar?month=${month}&year=${year}`, { responseType: 'text' });
    setMonthYearText(response?.data || '');
} catch (error) {
    console.error(`Error fetching calendar month year: ${error.message}`);
}
        }
        
        
    };

    useEffect(() => {
        let month = new URLSearchParams(window.location.search).get('month');
        let year = new URLSearchParams(window.location.search).get('year');

        if(!month && year != null){
            setSelectedOption('option2')
            setIsShowYearCalendar(true);
            fetchCalendarText();
        }else if(month != null && year != null ){
            setSelectedOption('option1')
            fetchCalendarText();
            console.log("done op1");
        }

        
        
    },[]);
    const radioButtonChange = (e) => {
        setSelectedOption(e.target.value);
        const option = e.target.value;
        if(option == 'option1'){
            setIsShowMonthCalendar(true);
            setIsShowYearCalendar(false);
        }else{
            setIsShowMonthCalendar(false);
            setIsShowYearCalendar(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (!isNaN(inputValue)) {    
                navigate("?year="+inputValue);
                setIsShowYearCalendar(true);
                fetchCalendarText();
            } else {
                setInputValue('');
            }
        }
    };

    const viewMonth = () => {
        navigate(`?month=${month}&year=${year}`);
        fetchCalendarText();
      };

    return (
        <main >
            
            <h2>Xem Lịch</h2>
            <div>
                <label>
                    <input
                    type="radio"
                    value="option1"
                    checked={selectedOption === 'option1'}
                    onChange={radioButtonChange}
                    />
                    Lịch tháng
                </label>
                <br/>
                <label>
                    <input
                    type="radio"
                    value="option2"
                    checked={selectedOption === 'option2'}
                    onChange={radioButtonChange}
                    />
                    Lịch năm
                </label>
            </div>
            
            {
                selectedOption == 'option1' &&
                <>
                <p style={{ marginTop: "1rem" }}>
                    <div>
                        <form name="SelectMonth" action="">
                            Tháng {' '}
                            <select name="month" 
                                value={month} 
                                onChange={(e) => 
                                setMonth(e.target.value)}
                                className="navi-r"
                            >
                            {Array.from({ length: 12 }, (_, index) => (
                                <option key={index} value={(index + 1).toString()}>{index + 1}</option>
                            ))}
                            </select>
                            <br/>
                            Năm {' '}
                            <input
                            type="number"
                            name="year"
                            size={4}
                            value={year}
                            className="navi-r"
                            onChange={(e) => setYear(e.target.value)}
                            />
                            <br/>
                            <p>
                            <button class="navi-r" type="button" onClick={viewMonth}>
                                Xác nhận
                            </button>
                            </p>
                            <br/>
                        </form>
                    </div>
                    { monthYearText ? (
                        <>
                            {isShowMonthCalendar &&<span dangerouslySetInnerHTML={{ __html: monthYearText }} />
                            }
                            
                            
                        </>
                    ) : (
                        <>
                            <p>Đang lấy dữ liệu lịch tháng</p>
                        </>
                    )}
                </p>
                </>
            }
            {
                selectedOption == 'option2' &&
                <>
                <p style={{ marginTop: "1rem" }}>
                    { calendarText ? (
                        <>
                            Năm {' '}
                            <input 
                                size={15}
                                className="navi-r"
                                type="text" 
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <br/><br/>
                            {isShowYearCalendar &&<span dangerouslySetInnerHTML={{ __html: calendarText }} />
                            }
                            
                        </>
                    ) : (
                        <>
                            <p>Đang lấy dữ liệu lịch năm</p>
                        </>
                    )}
                </p>
                </>
            }
            
        </main>
    );
}

export default Calendar;
