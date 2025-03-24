import { toast, Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client'

const API_URL='https://43.204.79.35:'

//old
export const API_URL4006 = "https://bodspheretest.bodsphere.com:4006/"
export const API_URL4002 = "https://bodspheretest.bodsphere.com:4002/"
export const API_URL4003 = "https://bodspheretest.bodsphere.com:4003/"
export const API_URL4001 = "https://bodspheretest.bodsphere.com:4001/"


export const API_URL4007 = "https://bodspheretest.bodsphere.com:4007/"
export const API_URL4004 = "https://bodspheretest.bodsphere.com:4004/"
export const API_URL4000 = "https://bodspheretest.bodsphere.com:4000/"
export const API_URL4005 = "https://bodspheretest.bodsphere.com:4005/"
export const API_URL4010 = "https://bodspheretest.bodsphere.com:4010/"
export const API_URL4009 = "https://bodspheretest.bodsphere.com:4009/"
export const API_URL4011 = "https://bodspheretest.bodsphere.com:4011/" 
export const API_URL4008 = "https://bodspheretest.bodsphere.com:4008/" 

// // this is for donation route






// export const API_URL4006 = "https://bodsphereyoga.bodsphere.com:4006/"
// export const API_URL4002 = "https://bodsphereyoga.bodsphere.com:4002/"
// export const API_URL4003 = "https://bodsphereyoga.bodsphere.com:4003/"
// export const API_URL4001 = "https://bodsphereyoga.bodsphere.com:4001/"


// export const API_URL4007 = "https://bodsphereyoga.bodsphere.com:4007/"
// export const API_URL4004 = "https://bodsphereyoga.bodsphere.com:4004/"
// export const API_URL4000 = "https://bodsphereyoga.bodsphere.com:4000/"
// export const API_URL4005 = "https://bodsphereyoga.bodsphere.com:4005/"
// export const API_URL4010 = "https://bodsphereyoga.bodsphere.com:4010/"
// export const API_URL4009 = "https://bodsphereyoga.bodsphere.com:4009/"
// export const API_URL4011 = "https://bodsphereyoga.bodsphere.com:4011/"
// export const API_URL4008 = "https://bodsphereyoga.bodsphere.com:4008/" 

// export  const socket = io("https://bodsphereyoga.bodsphere.com:4000")







//new
// export const API_URL4006 = "https://yoga.bodsphere.com/profile/"
// export const API_URL4002 = "https://yoga.bodsphere.com/login/"
// export const API_URL4003 = "https://yoga.bodsphere.com/dashbord/"
// export const API_URL4001 = "https://yoga.bodsphere.com/registration/"


// export const API_URL4007 = "https://yoga.bodsphere.com/settings/"
// export const API_URL4004 = "https://yoga.bodsphere.com/categories/"
// export const API_URL4000 = "https://yoga.bodsphere.com/admin/"
// export const API_URL4005 = "https://yoga.bodsphere.com/notification/"
// export const API_URL4010 = "https://yoga.bodsphere.com/schoolflow/"
// export const API_URL4009 = "https://yoga.bodsphere.com/teacherflow/"

//old
export const AccreditedImagePath = 'https://bodespherbucket.s3.ap-south-1.amazonaws.com/uploads/'
export const AudioPath ='https://bodespherbucket.s3.ap-south-1.amazonaws.com/audio/'
export const DocumentPath = 'https://bodespherbucket.s3.ap-south-1.amazonaws.com/documents/'

//new
// export const AccreditedImagePath = 'https://d2pid80n0fyzx7.cloudfront.net/uploads/'
// export const AudioPath ='https://d2pid80n0fyzx7.cloudfront.net/audio/'
// export const DocumentPath = 'https://d2pid80n0fyzx7.cloudfront.net/documents/'

// export  const socket = io("https://yoga.bodsphere.com/admin")

export  const socket = io("https://bodspheretest.bodsphere.com:4000")


// export const ImagePath = 'https://d2pid80n0fyzx7.cloudfront.net/images/';
// export const vidPath="https://d2pid80n0fyzx7.cloudfront.net/m3u8/";



export const ImagePath = 'https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
export const vidPath="https://bodespherbucket.s3.ap-south-1.amazonaws.com/m3u8/";

// export const AccreditedImagePath = 'https://bodespherbucket.s3.ap-south-1.amazonaws.com/uploads/'
// export const AudioPath ='https://bodespherbucket.s3.ap-south-1.amazonaws.com/audio/'
// export const DocumentPath = 'https://bodespherbucket.s3.ap-south-1.amazonaws.com/documents/'

const apiHeaders={
  'Content-Type':'application/json'
}

export const successMessage = (message) => {
  return new Promise((resolve) => {
    toast.success(message, {
      // position: "top-right",
      autoClose: 1000,
      onClose: () => {
        resolve(); 
      }
    });
  });
};

export const errorMessage = (message) => {
  return new Promise((resolve) => {
    toast.error(message, {
      // position: "top-center",
      autoClose: 1000,
      onClose: () => {
        resolve(); 
      }
    });
  });
};

