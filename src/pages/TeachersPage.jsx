import Navbar from '../components/Navbar';
import  { DummyTeachers }  from '../components/TeachersData'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { useState } from 'react';

const ImageContainer = styled.div`
  width: 360px;
  height: 360px; 
`;

const Image = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
`;

const TeachersPage = () => {
  const { teacher_id } = useParams();
  const selectedTeacher = DummyTeachers.find(teacher => teacher.teacher_id === String(teacher_id));
  const [selectedDates, setSelectedDates] = useState([]);


  const handleSelect = (selectedDay) => {
    // 先清空選擇的日期
    setSelectedDates([]);
    // 加入新選的日期
    setSelectedDates([selectedDay]);
  };

  const handleSubmit = () => {
    // 在這裡使用表單資料，例如將資料存儲到 TeacherData 中
    const formData = {
      selectedDates,
      // 其他表單資料...
    };
    console.log('Submit:', formData);
    // 這裡可以進一步將資料送到伺服器，或進行其他適當的處理
    // 接下來你可以導航到預約成功的頁面，例如使用 React Router 的 useHistory 鉤子
  };



  return (
  <div>
    <Navbar />
      <div className="div-container col col-11" style={{ margin:'5% 0% 3% 7%'}}>
       {selectedTeacher && (
          <div key={selectedTeacher.id} style={{display:'flex'}}>

            <div className="teacher-img">

            <ImageContainer>
              <Image src={selectedTeacher.avatar} alt={selectedTeacher.name} />
            </ImageContainer>

            </div>

            
            <div className="teacher-summary" style={{ maxWidth:'600px',margin:'10% 0% 0% 10%'}}>
            <h1 className='teacher-summary-name' style={{fontWeight:'700',fontSize:'30px'}}>{selectedTeacher.name}</h1>
            <h4 className='teacher-summary-nation' style={{marginTop:'40%'}}>{selectedTeacher.nation}</h4>
            <h3 className='teacher-summary-rating'>
            {selectedTeacher.courses.map((course) => (
            <div key={course.class_id}>
            Rating:{course.total_score}
            </div>
                  ))}
            </h3>

            </div>


            <div className="teacher-info-style" >

        
            <div className="teacher-info" style={{maxWidth:'600px',position:'absolute',top:'55%',left:'10%',padding:'2% 0 5% 0'}}>
              <h4 className="teacher-info-title">Introduction</h4>
              <p className="teacher-info-detail"> {selectedTeacher.info}</p>
            </div>

            <div className="teacher-style" style={{position:'absolute',top:'65%',left:'10%',padding:'5% 0 5% 0'}}>
              <h4 className="teacher-style-title">Teaching Style</h4>
              <p className="teacher-style-detail">{selectedTeacher.teaching_style}</p>
            </div>

            
            <div className="teacher-lesson" style={{position:'absolute',top:'75%',left:'10%',padding:'6% 0 5% 0'}}>
              <h4 className="teacher-style-title">Lesson History</h4>
              <p className="teacher-style-detail">{selectedTeacher.teaching_style}</p>
            </div>

            </div>
            
           

            <div className="teacher-reserve" style={{margin:'5% 0 0 40%'}}>
              <div>
                <h3 className="teacher-reserve-title" style={{backgroundColor:'#f3f3f3',textAlign:'center',fontWeight:'600'}}>預約上課</h3>
                </div>
           <Dropdown>
          <Dropdown.Toggle variant="light btn-lg" style={{ width: '300px', marginTop: '5%' }} id="dropdown-basic">
            
             {selectedDates.length > 0 ? `Time: ${selectedDates.join(', ')}` : 'Time'}
          </Dropdown.Toggle>

          <Dropdown.Menu variant="btn-lg" style={{ width: '300px', marginTop: '5%' }}>
  {selectedTeacher.courses.map((course) => (
    <div key={course.class_id} style={{ width: '100%', marginTop: '2%' }}>
      {course.reserveDays.map((day, index) => (
        <Dropdown.Item 
          key={index}  // 使用 index 作為 key，或者使用具有唯一性的值
          onClick={() => handleSelect(day)}
          style={{ width: '100%', textAlign: 'center', padding: '5px', backgroundColor: '#fff' }}
        >
          {day}
        </Dropdown.Item>
      ))}
    </div>
  ))}
</Dropdown.Menu>
        </Dropdown>

              <Button className='btn-info' style={{ margin: '5% 0 0 70%' }} onClick={handleSubmit}>Submit</Button>
            </div>
      
          </div>
        )}
      </div>

  </div>
  );
};

export default TeachersPage;