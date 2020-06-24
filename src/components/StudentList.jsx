import React from 'react'
import {Button, Modal, Row, CardGroup, Card, Form, Col} from 'react-bootstrap'

class Students extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            //addStudentInfo: false,
            editInfo: false,
            editID: '',
            list: [],
            showAddModal: false,
            showUpdateModal: false,
            student:{
                name: "",
                surname: "",
                email: "",
                dob: ""
            }
        }
    }

    componentDidMount = async () =>{
        
    try {
        let response = await fetch(
          "http://127.0.0.1:3002/students"
        );
        const list = await response.json();
        this.setState({
          list
        })
      } catch (err) {
          console.log(err)
      }
    }

    
    addNewStudent = async () =>{
        
        try {
            let response = await fetch("http://127.0.0.1:3002/students", {
                method: "POST",
                body: JSON.stringify(this.state.student),
                headers:{
                    "Content-Type": "application/json"
                },
            })
            
            if (response.ok) {
                alert("Added successfully!")
                this.setState({
                    showAddModal: false
                });
            }
          } catch (err) {
              console.log(err)
          }
          
          console.log(this.state.student)
    }

    setStudentInfo = (event) =>{
        const student = this.state.student
        student[event.currentTarget.id] = event.currentTarget.value
       
        this.setState({student})
    }
    
    
    showAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal
        });
    }

    deleteStudentInfo = async (id) =>{
        
        try {
            let response = await fetch("http://127.0.0.1:3002/students/"+id, {
                method: "DELETE",
                headers:{
                    "Content-Type": "application/json"
                },
            })
            
            if (response.ok) {
                alert("Record deleted!")
                // this.setState({
                    
                // });
            }
          } catch (err) {
              console.log(err)
          }
    }

    
    getStudentInfo = async (id) =>{
        
        try {
            let response = await fetch("http://127.0.0.1:3002/students/"+id)
            
            const studentInfo = await response.json();
            this.setState({
                    student: studentInfo[0]
                });

          } catch (err) {
              console.log(err)
          }
          
    }

    
    updateStudentInfo = async (e) =>{
        e.preventDefault()
        try {
            let response = await fetch("http://127.0.0.1:3002/students/"+ this.state.editID, {
                method: "PUT",
                body: JSON.stringify(this.state.student),
                headers:{
                    "Content-Type": "application/json"
                },
            })
            
            if (response.ok) {
                alert("Record updated!")
                this.setState({
                    showUpdateModal: false
                });
            }
          } catch (err) {
              console.log(err)
          }
          
    }

    render(){
        //console.log(this.state.student)
        return(
             <>
                <CardGroup >
                        {this.state.list.map((student, i)=>{
                                
                            return(
                                <Card key={student.id}>
                                    <Card.Body>
                                    <Card.Title className="border-bottom">Student {i+1}</Card.Title>
                                    <Card.Text>
                                        <p>Id: {student.id}</p>
                                        <p>Name: {student.name}</p>
                                        <p>Surname: {student.surname}</p>
                                        <p>Email: {student.email}</p>
                                        <p>DOB: {student.dob}</p>
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="d-flex justify-content-around">           
                                        <Button variant="danger" onClick={() => this.deleteStudentInfo(student.id)}>
                                            Delete
                                        </Button>           
                                        <Button variant="warning" onClick={() => {
                                                                                this.setState({editInfo: true, showUpdateModal: true, editID: student.id})
                                                                                this.getStudentInfo(student.id)
                                                                            }
                                                                            }>
                                            Edit
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            )
                        })}
                    
                </CardGroup>    
                    <Button className="mt-3" variant="info" onClick={() => this.showAddModal()}>
                        Create New Student
                    </Button>
                    {/* <StudentHome handleStudentInfo={this.showAddModal} /> */}
                
                
                <Modal show={this.state.showAddModal} onHide={() => this.setState({ showAddModal: false })}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Student Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="d-flex justify-content-center">
                    <div className="p-3 d-flex flex-column">
                        <input
                            type="text" id="name"
                            placeholder="Enter student name" 
                            onChange={this.setStudentInfo}
                            value={this.state.student.name}
                        />
                        <input
                            type="text" id="surname"
                            placeholder="Enter student surname" 
                            onChange={this.setStudentInfo}
                            value={this.state.student.surname}
                        />
                        <input
                            type="text" id="email"
                            placeholder="Enter student email" 
                            onChange={this.setStudentInfo}
                            value={this.state.student.email}
                        />
                        <input
                            type="date" id="dob"
                            placeholder="Enter student dateOfBirth" 
                            onChange={this.setStudentInfo}
                            value={this.state.student.dob}
                        />
                        <Button onClick={this.addNewStudent}>POST</Button>
                    </div>
                    
                </div>
                </Modal.Body>
                </Modal>

                {this.state.editInfo &&(
                        
                    <Modal show={this.state.showUpdateModal} onHide={() => this.setState({ showUpdateModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Student Record</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <div className="p-3 d-flex flex-column">
                            <input
                                type="text" id="name"
                                // placeholder="Enter student name" 
                                value={this.state.student.name}
                                onChange={this.setStudentInfo}
                            />
                            <input
                                type="text" id="surname"
                                // placeholder="Enter student surname" 
                                value={this.state.student.surname}
                                onChange={this.setStudentInfo}
                            />
                            <input
                                type="text" id="email"
                                // placeholder="Enter student email" 
                                value={this.state.student.email}
                                onChange={this.setStudentInfo}
                            />
                            <input
                                type="date" id="dob"
                                // placeholder="Enter student dateOfBirth" 
                                value={this.state.student.dob}
                                onChange={this.setStudentInfo}
                            />
                            <Button onClick={this.updateStudentInfo}>UPDATE</Button>
                        </div>
                        
                    </div>
                    </Modal.Body>
                    </Modal>
                )}
                </>
           
        )
    }
}

export default Students
