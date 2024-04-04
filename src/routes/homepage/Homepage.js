import Navbar from '../../components/navabar/Navbar'
import Carousel from '../../components/carousel/Carousel'
import Card from '../../components/card/Card'
import "./homepage.css";
import Profile from './Profile';
import Facts from './Facts';
import Footer from './Footer';

const Homepage = () => {
  const cardImages = ["card-books.jpg","card-borrowed_books.jpg","card-clock.jpg","card-membership.jpeg"];
  const cardTitles = [
    "CHECK BOOKS AVAILABILITY",
    "LIBRARY STATUS",
    "PENALTY",
    "LIBRARY MEMBERS"
  ];
  const endpoints = [
    "book_availability",
    "status",
    "penalty",
    "library_members"
  ];
  return (
    <div>
      <Navbar/>
      <Carousel/>
      <div id="cards-container">
         {
            cardImages.map((img,index) => {
              return <Card image={img} title={cardTitles[index]} key={img} endpoint={endpoints[index]} />
            })
         }
      </div>
      <hr/>
      <Profile/>
      <hr/>
      <Facts/>
      <br/>
      <Footer/>     
    </div>
  )
}

export default Homepage