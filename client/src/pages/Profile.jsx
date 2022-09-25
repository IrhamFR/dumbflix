import React, { useContext } from 'react'
import {
  FaEnvelope,
  FaFemale,
  FaMale,
  FaMapMarked,
  FaPhone,
  FaRegMoneyBillAlt,
  FaUserCircle,
} from "react-icons/fa";
import {Container, Row, Col, Card, Button, Badge} from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';
import profileUser from '../Images/profileUser.png'
import { UserContext } from '../context/userContext'
import { API, setAuthToken } from '../config/api'
// import { useQuery } from 'react-query'

const initialUser = {
  fullname: "",
  email: "",
  gender: "",
  phone: "",
  address: "",
  subscribe: false
}

function Profile() {

  const title = "My Profile";
  document.title = "Dumbflix | " + title;
  
  const [state] = useContext(UserContext)
  console.log("state", state)
  // const [userData, setUserData] = useState()
  
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  // const navigate = useNavigate()
  
  
  // let { data: user } = useQuery('profileCache', async () => {
  //   const response = await API.get(`/profile`);
  //   setUserData(response.data.data)
  //   console.log(response)
  //   return response.data.data;
  // });
  
  return (
    <Container>
    <Row className="justify-content-center mt-5 mb-3">
      <Col md={8}>
        <Card className="rounded shadow border-0 bg-dark text-white p-5">
          <div className="d-flex justify-content-between">
            <div className="me-5">
              <h3 className='mb-3'>Personal Info</h3>
              <div className="mt-3">
                {/* Full Name */}
                <div className="d-flex mb-3 align-items-start">
                  <FaUserCircle className="text-danger me-3 fs-1" />
                  <div>
                    <h5>{state.user.fullname} {state.isAdmin && (<Badge className='ms-1' bg="secondary">Admin</Badge>)}</h5>
                    <p className="text-muted">Full Name</p>
                  </div>
                </div>
                {/* Email */}
                <div className="d-flex mb-3 align-items-start">
                  <FaEnvelope className="text-danger me-3 fs-1" />
                  <div>
                    <h5>{state.user.email}</h5>
                    <p className="text-muted">Email Address</p>
                  </div>
                </div>
                {/* Status */}
                <div className="d-flex mb-3 align-items-start">
                  <FaRegMoneyBillAlt className="text-danger me-3 fs-1" />
                  <div>
                    <h5>Active</h5>
                    <p className="text-muted">Status</p>
                  </div>
                </div>
                {/* Gender */}
                <div className="d-flex mb-3 align-items-start">
                  {state.user.gender === "Male" ? (
                    <FaMale className="text-danger me-3 fs-1" />
                  ) : (
                    <FaFemale className="text-danger me-3 fs-1" />
                  )}
                  <div>
                    <h5>{state.user.gender}</h5>
                    <p className="text-muted">Gender</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="d-flex mb-3 align-items-start">
                  <FaPhone className="text-danger me-3 fs-1" />
                  <div>
                    <h5>{state.user.phone}</h5>
                    <p className="text-muted">Phone Number</p>
                  </div>
                </div>
                {/* Address */}
                <div className="d-flex mb-3 align-items-start">
                  <FaMapMarked className="text-danger me-3 fs-1" />
                  <div>
                    <h5>{state.user.address}</h5>
                    <p className="text-muted">Address</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center'>
              <img className='rounded' src={profileUser} alt="nophoto" height={400}/>
              <Button
                variant="danger"
                className="changePhotoBtn mt-2 btn-md px-2 py-1 ms-1"
              >
                Change Photo
              </Button>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default Profile