import React from 'react';
import './css/Transcation.css';
import Table from 'react-bootstrap/Table';
import dataTrans from '../dataDummy/DataFakeTransaction'
import DropdownAdm from "../components/DropdownAdm";

const TablePage = ({}) => {
  return (
    <div className="transcation-container">
        <h4 style={{marginBottom: '30px'}}>Incoming Transaction</h4>
        <Table hover className="transcation-table">
            <thead>
                <tr style={{color: "#E50914", background: "#1F1F1F"}}>
                    <th>No.</th>
                    <th>Users</th>
                    <th>Bukti Transfer</th>
                    <th>Remaining Active</th>
                    <th>Status User</th>
                    <th>Status Payment</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {dataTrans.map((data, index) => {
                    let color = data.id < "3" ? '#0ACF83' : (data.status <= "3" ? '#F7941E' : '#FF0742' );
                    return(
                        <tr style={{color: "#FFFFFF"}}>
                            <td>{data.id}</td>
                            <td>{data.users}</td>
                            <td>{data.prove}</td>    
                            <td>{data.remain}</td>    
                            <td style={{color}}>{data.status}</td>    
                            <td style={{color}}>{data.statusPay}</td>    
                            <td><DropdownAdm/></td>    
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </div>
  );
}

export default TablePage;

// import React from 'react';
// import './css/Transcation.css';
// // import Table from 'react-bootstrap/Table';
// // import dataTrans from '../dataDummy/DataFakeTransaction'
// import DropdownAdm from "../components/DropdownAdm";
// import { Table } from "react-bootstrap";
// import { useQuery } from "react-query";
// import { API } from "../config/api";

// const IncomingTransaction = () => {
//     const title = "Transactions";
//     document.title = "Dumbflix | " + title;

//     let { data: transaction } = useQuery("transactionCache", async () => {
//         const response = await API.get("/transactions");
//         return response.data.data;
//       });
    
//       function Duration(dueDate, startDate) {
//         const due = new Date(dueDate);
//         startDate = new Date();
    
//         let duration;
    
//         if (startDate < due) {
//           duration = new Date(due - startDate);
//         }
    
//         let years = duration.getFullYear() - 2000;
//         let months = duration.getMonth();
//         let days = duration.getDate();
    
//         let yearTxt = "year";
//         let monthTxt = "month";
//         let dayTxt = "day";
    
//         if (years > 1) yearTxt += "s";
//         if (months > 1) monthTxt += "s";
//         if (days > 1) dayTxt += "s";
    
//         if (years >= 1) {
//           duration = `${years} ${yearTxt} ${months} ${monthTxt} ${days} ${dayTxt}`;
//         } else if (months >= 1) {
//           duration = `${months} ${monthTxt} ${days} ${dayTxt}`;
//         } else {
//           duration = `${days} ${dayTxt}`;
//         }
//         return duration;
//       }
    

//   return (
//     <div className="transcation-container">
//         <h4 style={{marginBottom: '30px'}}>Incoming Transaction</h4>
//         <Table hover className="transcation-table">
//             <thead>
//                 <tr style={{color: "#E50914", background: "#1F1F1F"}}>
//                     <th>No.</th>
//                     <th>Users</th>
//                     <th>Bukti Transfer</th>
//                     <th>Remaining Active</th>
//                     <th>Status User</th>
//                     <th>Status Payment</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {transaction?.map((data, index) => {
//                     // let color = data.id < "3" ? '#0ACF83' : (data.status <= "3" ? '#F7941E' : '#FF0742' );
//                     return(
//                         <tr style={{color: "#FFFFFF"}}>
//                             <td>{index + 1}</td>
//                             <td>{data.user.fullname}</td>
//                             <td>struk.jpg</td>    
//                             <td>{Duration(data.dueDate, data.startDate)}</td>    
//                             <td>{data.status}</td>    
//                             <td>Approved</td>    
//                             <td><DropdownAdm/></td>    
//                         </tr>
//                     )
//                 })}
//             </tbody>
//         </Table>
//     </div>
//   );
// }

// export default IncomingTransaction;