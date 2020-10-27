
const db = require('./connection');
const { User} = require('../models');

db.once('open', async () => {
    
    await User.deleteMany();

    await User.insertMany( [
        {
            firstName: "Jane ",
            lastName:"Doe", 
            email  : "jane@testuser.test",         
            password: "Potato1",
            projects:[
                {title:"Covid 19",
            ideasText:"Helping the community to be safe all moment",
            date: new Date(Date.now())}
        ],
        projectCount:1
        },
        {
            firstName: "Eduard ",
            lastName:"Smith", 
            email  : "eduard@testuser.test",         
            password: "Potato2",
            projects:[
                {title:"Memories to my travel",
            ideasText:"the life always gone has hard moment...but we have teh responsability to take the best option",
            date: new Date(Date.now())},
            {
                title:"Memories to my travel 2",
                ideasText:"the life always gone has hard moment...but we have teh responsability to take the best option",
                date: new Date(Date.now())
            }
        ],
        projectCount:2
        }        
      ]);
  
       
  
    process.exit();
  });