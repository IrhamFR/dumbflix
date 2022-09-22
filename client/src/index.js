import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';

const client = new QueryClient();

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <UserContextProvider>
//       <QueryClientProvider client={client}>
//         <Router>
//           <App />
//         </Router>
//       </QueryClientProvider>
//     </UserContextProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
