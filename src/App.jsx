import { useState, useEffect } from "react";
import PrimarySearchAppBar from "./Components/Commons/Header";
import { Paper, Stack, Box, Typography } from "@mui/material";
import { GraphComp } from "./Components/GraphComp";
import LaunchDashboard from "./Components/Launch Dashboard/LaunchDashboard";
import MapData from "./Components/MapData";
import CustomTimeline from "./Components/TimeLine";
import './App.css'
import { LaunchesMap } from "./Components/LaunchesMap";

function App() {
  const drawerWidth ='210px' 
  const [years, setYears] = useState([])
  const [analyticsData, setAnalyticsData] = useState([{}])
  const [allLaunches, setallLaunches] = useState([])
  const [datasets, setDatasets] = useState({
    label: 'Launch Over Time',
    data: [],
    backgroundColor: 'rgba(255,99,132,0.5)'
  })
  const getPastData = async () => {
    const res = await fetch('https://api.spacexdata.com/v3/launches/past');
    var resultPast = await res.json();
    var dataset = {}
    resultPast.forEach(launch => {
      dataset[launch.launch_year] = (dataset[launch.launch_year] ?? 0) + 1
    })
    setYears(Object.keys(dataset))
    setDatasets(prev => {
      return {
        ...prev,
        data: Object.values(dataset)
      }
    })
    setAnalyticsData((prev) => {
      return [...prev, { count: resultPast.length, text: "Past" }]
    })
  }

  const getFutureData = async () => {
    const res = await fetch('https://api.spacexdata.com/v3/launches/upcoming')
    var resultFuture = await res.json();
    console.log(resultFuture.length)
    setAnalyticsData((prev) => {
      return [...prev, { count: resultFuture.length, text: 'Upcoming' }]
    })
  }
  const getTotalLaunches = async () => {
    const res = await fetch('https://api.spacexdata.com/v3/launches')
    var resultTotal = await res.json();
    setAnalyticsData((prev) => {
      return [...prev, { count: resultTotal.length, text: 'Total' }]
    })
    setallLaunches(resultTotal);
  }

  useEffect(() => {
    getPastData();
    getFutureData();
    getTotalLaunches();
  }, [])



  return (
    <>
      <PrimarySearchAppBar /><br /><br /><br />
      <Stack>
        <Typography variant="h3" ml={{ md: drawerWidth, xs: '0' }} mt={{ md: "70px", xs: '0' }}>Analytics Dashboard</Typography>
        <LaunchDashboard analyticsData={analyticsData} />
      </Stack>
      <Paper elevation={15} sx={{ml:{ md: drawerWidth, xs: '0' }, mt:{ md: "10px", xs: '0' }}}>
        <Stack p={3} sx={{overflow:"auto"}} >
          <Stack direction={{ xs: 'column', md: 'row' }} sx={{ maxWidth: '100%' }} gap={5} justifyContent={"space-around"}>
            <Box sx={{ height: "400px",width:{xs:"100%",md:"400px"} }}>
                <LaunchesMap />
            </Box>
            <Box sx={{ width: { xs: '100%', md: '500px' }}}>
              {/* Graph */}
              <Paper  sx={{ width: { xs: '100%', md: '380px' },display: 'flex', alignItems: 'center', justifyContent: 'center' , height: '400px', m: '10px' }}>
                <GraphComp datasets={[
                  datasets
                ]} labels={years} />
              </Paper>
            </Box>
            <Box>
              <CustomTimeline labels={years} datasets={datasets} allLaunches={allLaunches} />
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

export default App;
