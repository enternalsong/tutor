import { useState,useEffect,useRef,useContext } from 'react';
import arrow_right from './../assets/images/svg/arrow-right.svg';
import arrow_left from './../assets/images/svg/arrow-left.svg';
import axios from 'axios';
import { AppContext } from '../App';
const Students_profile_Calender = ({openRatingModal,openGoClassModal}) =>{
    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    const [currentMonth,setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [courseList, setCourseList] = useState([]);
    const calender_block = useRef(null);
    const student_data = JSON.parse(localStorage.getItem("userdata")).data;
    const { state } = useContext(AppContext);
    const api = 'http://34.125.232.84:3000';


    const months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];
    const check_lunar_year = (year)=>{
        if(year%4!==0){
            return false;
        }
        if(year %4===0 && year %100 !==0){
            return true;
        }
        if(year %400===0){
            return true;
        }
        if(year%1000===0){
            return true;
        }
        else{
            return false;
        }
    }
    const get_days_in_month = (year,month)=>{
        let days_arr = [31,28,31,30,31,30,31,31,30,31,30,31];
        let is_lunar = true;
        //console.log(month);
        //console.log(is_lunar);
        if(month ===1){
             is_lunar = check_lunar_year(year);
            if(is_lunar===true){
                return 29;
            }
            else{
                return 28;
            }
        }
        else{
            return days_arr[month];
        }   
    }
    const increament_year =(add)=>{

        setCurrentYear(currentYear+add);
    }


    let firstDayOfMonth= new Date(currentYear, currentMonth, 1).getDay();
    let dayInMonth= get_days_in_month(currentYear,currentMonth);
    const weeks_arr = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const render_week_array = [];
    let currentDay = 1;
    let key = 0 ;
    const show_course=(course,index)=>{
        let course_block = ``
        let course_date = new Date(course.timestamp);
        // if( course.isattend ===false && course.timestamp < today.getTime()){
        //     course_block =
        //     <div className="course-block bg-absent" key={index}>
        //         <div className="title-bar absent">{course_list[index].subject}</div>
        //         <div>{course_list[index].teacher}</div>
        //         <div>{course_list[index].time}</div>
        //     </div>
        // }
        if( course.timestamp > today.getTime()){
            course_block =
            <div className="course-block bg-reserve" key={index} onClick={(e)=>{openGoClassModal(course.name,course.date,course.time,course.courseId)} }>
                <div className="title-bar reserve display-none">{course.subject}</div>
                <div className="display-none">{course.name}</div>
                {course.time===30 ? 
                (<div className="display-none">{course.hour}:{String(course.min).padStart(2, '0')}~{new Date(course_date.setMinutes(course_date.getMinutes()+30)).getHours() }:{String(new Date(course_date.setMinutes(course_date.getMinutes()+30)).getMinutes()).padStart(2, '0')}</div>):
                (<div className="display-none">{course.hour}:{String(course.min).padStart(2, '0')}~{new Date(course_date.setMinutes(course_date.getMinutes()+60)).getHours() }:{String(new Date(course_date.setMinutes(course_date.getMinutes()+60)).getMinutes()).padStart(2, '0')}</div>)
                }
            </div>
        }
        else if ( course.rating===0){
            course_block =             
            <div className="course-block bg-not-review" key={index} onClick={()=>{openRatingModal(course.name,course.date,course.courseId)}}>
                <div className="title-bar notreview display-none">{course.subject}</div>
                <div className="display-none">{course.name}</div>
                {course.time===30 ? 
                (<div className="display-none">{course.hour}:{String(course.min).padStart(2, '0')}~{new Date(course_date.setMinutes(course_date.getMinutes()+30)).getHours() }:{String(new Date(course_date.setMinutes(course_date.getMinutes()+30)).getMinutes()).padStart(2, '0')}</div>):
                (<div className="display-none">{course.hour}:{String(course.min).padStart(2, '0')}~{new Date(course_date.setMinutes(course_date.getMinutes()+60)).getHours() }:{String(new Date(course_date.setMinutes(course_date.getMinutes()+60)).getMinutes()).padStart(2, '0')}</div>)
                }
            </div>
        }
        else if ( course.rating!==0 ){
            course_block =
            <div className="course-block bg-finish" key={index}>
                <div className="title-bar finish display-none">{course.subject}</div>
                <div className="display-none">{course.name}</div>
                {course.time===30 ? 
                (<div className="display-none">{course.hour}:{String(course.min).padStart(2, '0')}~{new Date(course_date.setMinutes(course_date.getMinutes()+30)).getHours() }:{String(new Date(course_date.setMinutes(course_date.getMinutes()+30)).getMinutes()).padStart(2, '0')}</div>):
                (<div className="display-none">{course.hour}:{String(course.min).padStart(2, '0')}~{new Date(course_date.setMinutes(course_date.getMinutes()+60)).getHours() }:{String(new Date(course_date.setMinutes(course_date.getMinutes()+60)).getMinutes()).padStart(2, '0')}</div>)
                }
            </div>
        }

        return(course_block);
    }

    for(let i = 0 ; i < 5; i++)
    {

        const render_day_arr = [];
        for (let j=1 ; j < 8; j++){
            if(i===0 && j < firstDayOfMonth ){
                render_day_arr.push(<div className="col calender_block bg-deep" key={'calender'+key}></div>);
            }
            else if(currentDay <= dayInMonth){
                let newDiv = [];
                let count_course = 0;
                for( let z=0; z<courseList.length; z++){
                    //console.log(currentDay)
                    if( courseList[z].day === currentDay &&
                        courseList[z].month - 1 === currentMonth &&
                        courseList[z].year === currentYear){

                        if(count_course >= 2){
                            newDiv.push(
                                <button className="btn-more" key={'btn-more'+key}>More</button>
                            )
                            z = courseList.length;
                        }
                        else{
                        let inner = show_course(courseList[z],z);
                        newDiv.push(
                        inner)
                        }
                        count_course++;
                    }
                }
                render_day_arr.push(<div  className="col calender_block" key={'calender'+key}>{currentDay}{newDiv}</div>);
                currentDay++;
            }
            else{
                render_day_arr.push(<div className="col calender_block bg-deep" key={'calender'+key}></div>);
            }
            key++;
        }
        render_week_array.push(<div className="d-flex " key={i}>{render_day_arr}</div>)
    }
    useEffect(() => {
        const fetchStudentData = async () => {
          try {
            const studentId = JSON.parse(localStorage.getItem("userdata")).data.id;
            const response = await axios.get(`${api}/student/${studentId}`);
    
            const studentData = response.data;
    
            console.log('Student Data:', studentData);
    
            if (studentData.data.Registrations) {
            
               const courses = studentData.data.Registrations.map(course => {
                const startDate = new Date(course.Course.startAt);
                return {
                courseId: course.courseId,
                year: startDate.getFullYear(),
                month: startDate.getMonth() + 1,
                hour: startDate.getHours(),
                day: startDate.getDate(),
                min:startDate.getMinutes(),
                name: course.Course.name,
                subject: course.Course.category[0],
                 time: course.Course.duration,
                 isattend: true,
                 timestamp: startDate.getTime(),
                date: course.Course.startAt,
                rating: course.rating,
                comment: course.comment,
                };
              });
              setCourseList(courses);
              console.log('Coursedata',courses);
            }else{
                console.log('No courses data available.');
            }
          } catch (error) {
            console.error('Error fetching teacher data:', error);
          }
        };
    
        if (JSON.parse(localStorage.getItem("userdata")).data) {
          fetchStudentData();
        }
    
      }, []);
    useEffect(()=>{

    },[]);


    useEffect(()=>{  
    },[currentMonth,currentYear])
    return(
        <>
        <div className="d-flex justify-between mb-20px">
            <select className="month-selection" name="months" value={currentMonth} onChange={(e)=>{
                setCurrentMonth(parseInt(e.target.value))}}>
            {
                months.map((month,key)=>{
                    return(
                        <option key={key} value={key} onClick={()=>{setCurrentMonth(key)}}> {month}</option>
                    )
                })
            }
            </select>
            <div className="d-flex items-center">
                <img className="btn" src={arrow_left} onClick={(e)=>{increament_year(-1)}}/>
                <div className="text-primary">{currentYear}</div>
                <img className="btn rotate-arrow" src={arrow_left} onClick={(e)=>{increament_year(1)}}/>
            </div>
        </div>

            <div className="d-flex flex-reverse mb-10px"> 
                <div className="d-flex items-center ">
                    <div className="circle-icon bg-finsh mr-10px"></div>
                    <div className="">已完課</div>

                </div>
                <div className="d-flex items-center mr-10px">
                <div className="circle-icon bg-no-dis mr-10px"></div>
                    <div className="">未評論</div>

                </div>
                <div className="d-flex items-center mr-10px">
                    <div className="circle-icon bg-not-seat mr-10px"></div>
                    <div className="">缺席</div>
                </div>
                <div className="d-flex items-center mr-10px">
                    <div className="circle-icon bg-o-not-l mr-10px"></div>
                    <div className="">已預約未聽課</div>

                </div>
            </div>
            <div className="d-flex">
            {
                    weeks_arr.map((week,key)=>{
                        return(
                            <div className="col" key={week}>
                                <div className="block-week bg-primary">{week}</div>
                            </div>
                        )
                    })
            }
                
            </div>
            <div id="calender-block" className="calender_table">{render_week_array}</div>
        </>
    )
}
export default Students_profile_Calender;