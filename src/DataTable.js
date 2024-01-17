// import React, { useState, useEffect } from "react";
// import EnhancedTable from './EnhancedTable';
// import styled from "styled-components";


// const TableContainer = styled.div`
//   margin: 50px auto;
//   max-width: 1000px;
//   padding: 10px;
// `;

// const DataTable = () => {
//   // Your existing code

//   return (
//     <TableContainer>
//       <h2>Data Table</h2>
//       <EnhancedTable />
//     </TableContainer>
//   );
// };
// export default DataTable;

import React from "react";
import EnhancedTable from "./EnhancedTable";
import styled from "styled-components";
import AdbTwoToneIcon from '@mui/icons-material/AdbTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';

const Container = styled.div`
  display: flex;
`;
const Sidebar = styled.div`
  width: 50px;
  background-color:#edf5ef;
  color: white;
  padding: 20px;
  height:650px;
  border-right: 1px solid #ddd; 
`;
const Logo = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;
const Content = styled.div`
  flex: 1;
`;
const TopNavbar = styled.div`
  background-color: white;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd; 
`;
const LoginLink = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
  margin-right:20px;
  font-weight:bold;
  font-size:2rem;
  &:hover {
    text-decoration: underline;
  }
`;
const TableContainer = styled.div`
  margin-top: 40px;
  margin-left: 80px;
  width:1000px;
  display:flex;
  justify-content:center;
  
`;
const StyledHeading = styled.h2`
  color: black; /* Set your desired text color */
  font-size: 11px; /* Set your desired font size */

`;

const DataTable = () => {
  // Your existing code
  return (
    <Container>
      <Sidebar>
      <div style={{ marginBottom: '20px' }}>
      <AdbTwoToneIcon style={{ color: 'black' , fontSize: '3em'  }}></AdbTwoToneIcon>
      </div>
      <div style={{ marginBottom: '20px' }}>
      <DashboardTwoToneIcon style={{ color: 'black' , fontSize: '3em' }}></DashboardTwoToneIcon>
      </div>
      <PostAddTwoToneIcon style={{ color: 'black' , fontSize: '3em' }}></PostAddTwoToneIcon>
        {/* Add more logos as needed */}
      </Sidebar>
      <Content>
        <TopNavbar>
          <StyledHeading><h2>Company</h2></StyledHeading>
          <LoginLink href="/login">LogIn</LoginLink>
        </TopNavbar>
        <TableContainer>
          <EnhancedTable />
        </TableContainer>
      </Content>
    </Container>
  );
};
export default DataTable;


