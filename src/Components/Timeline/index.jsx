import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { RocketLaunch } from '@mui/icons-material';
import { Paper } from '@mui/material';
import {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';

export default function CustomTimeline(props) {
  // console.log(props);
  return (
    <Paper elevation={10} sx={{height:'400px',overflowY:"auto"}}>
      <Typography textAlign={'center'} fontSize={'large'} m={3}>
        Launch Timeline
      </Typography>
      

    <Timeline position="" sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}>
      {
        props.allLaunches.map((elem) => {
          console.log(elem);
          return <>
            <TimelineItem>
              <TimelineOppositeContent sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary">
                <Typography >{elem.mission_name}</Typography>
                <Typography variant='body2' >{elem.launch_success ? "Success" : "Failure"}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot sx={{backgroundColor: elem.launch_success ? "green" : "red"}}>
                  <RocketLaunch />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography sx={{display:'inline-block'}} variant='p'>{elem.launch_date_utc}</Typography>
                
              </TimelineContent>
            </TimelineItem>
          </>
        })
      }
    </Timeline>
    </Paper>
  );
}
