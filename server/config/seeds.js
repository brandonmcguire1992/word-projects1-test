const db = require('./connection');
const { User} = require('../models');

db.once('open', async () => {
    
    await User.deleteMany();

    await User.create( [
        {
            firstName: "Jane ",
            lastName:"Doe", 
            email  : "jane@testuser.test",         
            password: "password1",
            projects:[
                {title:"Covid 19,an advertising move",
            ideasText:`Helping the community to be safe all moment. At this point, you already know how to #Wash your hands properly,
             but if soap and water are not available, you have the option of using a hand sanitizer with at least 60% alcohol to help 
             stop the spread of harmful germs and viruses. We bet you know how to use your mask correctly!
             And if you forgot, remember to cover your nose and mouth to #Stop the spread of # COVID19.
             The most common symptoms of COVID-19 are fever, dry cough and tiredness. Other less common symptoms that affect 
             some patients include aches and pains, nasal congestion, headache, conjunctivitis, sore throat, diarrhea,
              loss of taste or smell, and skin rashes or color changes. on the fingers or toes. 
             These symptoms are usually mild and begin gradually. Some of the infected people have only very mild symptoms.`,
            date: new Date(Date.now())}
        ],      
        },
        {
            firstName: "Eduard ",
            lastName:"Smith", 
            email  : "eduard@testuser.test",         
            password: "password123",
            projects:[
                {title:"Memories to my travel",
            ideasText:`I want to write a book about everything that I lived in this journey.
             the life always gone has hard moment...but we have the responsability to take the best option.
             The uncertainty that awaits you when crossing the border from one country to another. 
              How to act in each country so as not to attract attention. The shortage of food and money. 
              A beautiful memory to share with society. `,
            date: new Date(Date.now())},
            {
                title:"Changing the lifestyle in a new country ",
                ideasText:`Other book How to survive in a new culture. Begin to study a new language in order 
                to communicate. Respect the traditions and culture of the country ... know its history.`,
                date: new Date(Date.now())
            }
        ],               
        } ,
        {
            firstName: 'Elijah',
            lastName: 'Holt',
            email: 'eholt@testmail.com',
            password: 'password12345',
            projects:[{
                title:"Sport for better health",
                ideasText:`Improves fitness and physical endurance.
                Regulates blood pressure figures.
                Increase or maintain bone density.
                Improves insulin resistance.
                Helps maintain body weight.
                Increases muscle tone and strength.
                Improves flexibility and mobility of the joints.`,
                date: new Date(Date.now())
            }]
        }       
      ]);

            
      process.exit();
  });
