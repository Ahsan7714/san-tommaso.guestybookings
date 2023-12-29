import React from "react";
import about from '../../assets/about2.jpg'
const About = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:h-[120vh] py-5 lg:py-0 mt-[160px] lg:mt-[100px] mb-[80px] bg-gray-200 w-full rounded-md">
      <div className="flex lg:w-[50%] flex-col px-6 lg:px-12 py-10 gap-6">
        <h1 className="lg:text-[35px] text-[33px] font-semibold text-[#10275b]">About San Tommaso</h1>
        <p>
          Agriturismo San Tommaso is located on a hill with a splendid view of
          the valley, 2 km from the village of Pomarance, near Volterra, and
          enjoys the sun from morning to evening. It is 30 km from the sea and
          in a central position in relation to the most important cities of art
          such as Siena, Florence, Pisa, Lucca. In about 30 minutes you can
          reach Volterra, Massa Marittima, San Gimignano and the most important
          wine cellars of Tuscany.
        </p>
        <p>
          This is the perfect place for lovers of trekking, mountain biking and
          horse riding in the nearby riding school. At 3 km there are the
          origins of Cecina river with crystal clear water for swimming.
        </p>
        <p>
          In the property there are 2 houses with 3 apartments each, all very
          independent with their own private outdoor space, barbecue and
          parking. In one of the apartments lives the owner who, besides taking
          care of the vineyard, the olive trees and the garden, is always
          available for any need. All around there is a large and green garden
          with panoramic walk, refreshment area and large furnished terraces.
          The 16 x 8 m swimming pool is fenced in and has a waterfall, a Jacuzzi
          and a private shaded area for each apartment.
        </p>
        <p>Here are produced extra virgin olive oil and good wine.</p>
      </div>
      <div className="lg:w-[50%] px-2 lg:px-0">
        <img src={about} alt="" className="w-[100%] lg:h-[120vh]  object-cover"/>
      </div>
    </div>
  );
};

export default About;
