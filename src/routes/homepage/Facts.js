import "./homepage.css";

const Facts = () => {
  return (
    <>    
      <div className='lib'>
        <h3>Why is the library better than the internet?</h3>
        <div className='left-side-content' data-aos="fade-right" data-aos-duration="1000" data-aos-mirror="true" >
          <p>
          There are several reasons why the library is better than the internet when it comes to
          finding information. First, the information you see in the library has been carefully compiled
          and checked for accuracy by trained librarians. This means that you can trust that the information
          you find in the library is reliable and up-to-date
          </p>
        </div>

        <div className='right-side-content' data-aos="fade-left" data-aos-duration="1000" data-aos-mirror="true">
        <p>
          Second, the library offers a wider range of resources than the internet. In addition to books, you can
          find journals, newspapers, and other materials that are not easily accessible online. This means you
          can explore a variety of perspectives and sources to gain a more comprehensive understanding of a topic
        </p>
        </div>

        <div className='left-side-content' data-aos="fade-right" data-aos-duration="1000" data-aos-mirror="true">
        <p>
          Third, the library provides a quiet, focused learning and research space. You can work without distractions
          or interruptions to concentrate and learn more effectively
        </p>
        </div>

        <div className='right-side-content' data-aos="fade-left" data-aos-duration="1000" data-aos-mirror="true">
        <p>
          Finally, the library offers a wealth of assistance and support in finding the necessary information.
          The librarians are experts at finding and organizing information and are always available to assist
          you in your research
        </p>
        </div>
      </div>
    </>
  )
}

export default Facts