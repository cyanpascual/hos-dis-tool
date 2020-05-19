import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper, Button} from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
export default function WelcomeCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel autoPlay={false}>
            <div >
                <DialogTitle id="alert-dialog-title"><Typography variant="h6" gutterBottom>
                        Introducing TrAMS+
                    </Typography></DialogTitle>
                <DialogContent dividers>
                    
                    <Typography align="left" gutterBottom>
                    The UP College of Engineering (UP CoE) has formed a COVID19 response team which aims to provide engineering solutions to the critical needs of the country. One of the project initiatives of the UP CoE is the Tracing for Allocation of Medical Supplies (TrAMS+). Implemented by the UP Training Center for Applied Geodesy and Photogrammetry (UP TCAGP), the research and extension arm of the UP Department of Geodetic Engineering, this project is funded by the Department of Science and Technology (DOST) & monitor-managed by the Philippine Council for Industry, Energy, and Emerging Technology Research and Development (PCIEERD).
                    </Typography>
                </DialogContent>
            </div>
            <div >
                <DialogTitle id="alert-dialog-title"><Typography variant="h6" gutterBottom>
                    Goals and Objectives of TrAMS+
                    </Typography></DialogTitle>
                <DialogContent dividers>
                    
                    <Typography align="left" gutterBottom>
                        TrAMS+ project aims to help the government to properly allocate medical resources through an online tracking system that provides information on hospital resources and inventory, collects real-time requests for medical supplies, and maps out possible sources of medical supplies. TrAMS+ project also aims to complement the systems of the Department of Health (DOH) by providing verified information on the needs of the hospitals. 
                    </Typography>
                </DialogContent>
            </div>
            <div >
                <DialogTitle id="alert-dialog-title"><Typography variant="h6" gutterBottom>
                Who are the target users of TrAMS+?
                    </Typography></DialogTitle>
                <DialogContent dividers>
                    
                    <Typography align="left" gutterBottom>
                        <span style={{fontWeight:500}}>Hospitals.</span><br/> TrAMS+ offers a web platform for hospital personnel to present their medical supplies inventory which could be used by proper channels to effectively allocate and distribute medical supplies.
                    </Typography>
                    <Typography align="left" gutterBottom>
                        <span style={{fontWeight:500}}>Government Agencies.</span><br/> Government agencies, such as Local Government Units, could use the TrAMS+ platform in identifying hospitals within their jurisdiction which might need assistance especially during the COVID-19 pandemic. 

                    </Typography>
                    <Typography align="left" gutterBottom>
                        <span style={{fontWeight:500}}>Donors.</span><br/> Individuals, groups of people or organizations that are willing to help by donating medical supplies and other necessary resources may use TrAMS+ to identify hospitals that greatly need assistance during this pandemic.
                    </Typography> 
                </DialogContent>
            </div>
            <div >
                <DialogTitle id="alert-dialog-title"><Typography variant="h6" gutterBottom>
                Main Features
                    </Typography></DialogTitle>
                <DialogContent dividers>
                    
                    <Typography align="left" gutterBottom>
                        <span style={{fontWeight:500}}>Hospitals & Supplies </span><br/>Medical supplies tracking made easier! Use this feature to sort and filter hospitals according to their needs.
                    </Typography>
                    <Typography align="left" gutterBottom>
                        <span style={{fontWeight:500}}>Donate </span><br/> Click to donate! Reach out to hospitals through the TrAMS Donate feature. 

                    </Typography>
                    <Typography align="left" gutterBottom>
                        <span style={{fontWeight:500}}>Map</span><br/> Click on a hospital and find their locations on the map! Click on its location to also see nearby medical suppliers.
                    </Typography> 
                </DialogContent>
            </div>
        

        </Carousel>
    )
}

function Item(props)
{
    return (
        <div style={{width:"500px"}}>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                auctor fringilla.
                </Typography>
            </DialogContent>
        </div>
    )
}