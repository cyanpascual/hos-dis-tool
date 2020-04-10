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
            <div style={{width:"40vw"}}>
                <DialogTitle id="alert-dialog-title"><Typography variant="h6" gutterBottom>
                        Introducing TrAMS
                    </Typography></DialogTitle>
                <DialogContent dividers>
                    
                    <Typography align="left" gutterBottom>
                    The Tracing for Allocation of Medical Supplies or known as TrAMS is an initiative of the UP College of Engineering (UPCoE) together with the 
            UP Department of Geodetic Engineering (UPDGE) as response to the ongoing crisis of our health care system against COVID-19. The TrAMS project is
            part of Project 3: Tracking-High Risk Individual (headed by Dr. Ariel C. Blanco) and is currently led by Asst. Prof. Roseanne Ramos and 
            Asst. Prof. Ransie Joy Apura with team members from the UP Society of Geodetic Engineering Majors (UPGEOP).
                    </Typography>
                </DialogContent>
            </div>
            <div style={{width:"40vw"}}>
                <DialogTitle id="alert-dialog-title"><Typography variant="h6" gutterBottom>
                        Filter
                    </Typography></DialogTitle>
                <DialogContent dividers>
                    
                    <Typography align="left" gutterBottom>
                    Hospitals can be classified based on their current capacity on medical supplies. Filter by supply works by choosing a certain supply 
                  (alcohol, disinfectant, sanitizing kits, PPE,etc) and a supply level category (whether chosen supply is well-stocked, low or critically-low in stock).
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