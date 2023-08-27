import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, Stack } from '@mui/material';

export default function LaunchDashboard({ analyticsData }) {
    return (
        <>
        <Divider/>
            <Typography ml={{ md: "270px", xs: '0' }} mt={{ md: "10px", xs: '0' }}>Launch Dashboard</Typography>
            <Stack direction={'row'} ml={{ md: "270px", xs: '0' }} mt={{ md: "10px", xs: '0' }} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }} sx={{ border: '1px solid pink', gap: '20px',p:'10px' }}>
                {analyticsData? analyticsData.map((elem) => {
                    return (
                        <Card sx={{ minWidth: 275, minHeight: 150, flexGrow: 0.25 }} ml={"270px"} mt={"70px"} >
                            <CardContent>
                                <Typography variant='h2' sx={{ fontSize: 14, display: 'flex', justifyContent: 'center' }} color="text.secondary" gutterBottom>
                                    {elem.count}
                                </Typography>
                                <Typography sx={{ mb: 1.5, display: 'flex', justifyContent: 'center' }} color="text.secondary">
                                    {elem.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }):''}
            </Stack>
        </>
    )
}