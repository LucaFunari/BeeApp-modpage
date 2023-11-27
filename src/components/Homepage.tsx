import React from "react";
import { Navigate } from "react-router-dom";

function Homepage() {
  return (
    <div className=" flex justify-center ">
      <div className="p-6 h-full w-9/12 ">
        <Navigate to={"moderation"} />
        {/* <h1 className="text-3xl font-semibold  w-fit">Homepage</h1>
        <div className="break-words mt-6 font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
          tristique mi. Vivamus interdum malesuada massa, lacinia semper quam
          blandit non. Nullam mollis massa id iaculis rhoncus. Maecenas dui leo,
          porttitor finibus aliquam a, venenatis maximus nibh. Ut mattis ex nec
          diam vehicula, gravida dapibus purus feugiat. Sed nisl erat, vulputate
          eget mauris non, blandit consectetur tortor. Pellentesque non rutrum
          neque. Aliquam felis magna, semper vel enim eu, consequat tincidunt
          dolor. Sed consectetur vitae ligula at hendrerit. Maecenas euismod
          scelerisque felis sit amet aliquam. Cras a scelerisque magna, vitae
          fermentum turpis. Nullam faucibus nisl id aliquam dapibus. Nullam
          condimentum lorem arcu. Nunc consequat nisl quis odio blandit, ac
          malesuada sem ultricies. Nam accumsan enim sit amet augue congue, nec
          ultrices urna posuere.
        </div>

        <h1 className="text-3xl font-semibold  w-fit mt-6 ">
          Maecenas euismod feugiat sollicitudin
        </h1>
        <div className="break-words font-light ">
          Maecenas euismod feugiat sollicitudin. Sed justo diam, accumsan in leo
          quis, mollis lacinia turpis. Nullam facilisis pulvinar tincidunt.
          Proin sollicitudin in urna ac viverra. Sed dignissim, dui at ultrices
          hendrerit, nisl purus sodales dolor, eget mattis mauris lorem id
          velit. Suspendisse potenti. Phasellus porttitor mattis ipsum quis
          fringilla. Suspendisse odio orci, tincidunt id imperdiet vel, maximus
          quis ex. In sit amet dolor vel urna semper sodales. Aliquam nec
          bibendum quam. Sed a mattis purus.
        </div>
        <h1 className="mt-6 text-3xl font-semibold">
          Phasellus vel odio lectus
        </h1>
        <div className="break-words mt-6 font-light">
          Phasellus vel odio lectus. Suspendisse non massa odio. Morbi finibus
          mattis tempus. Vestibulum non arcu porttitor, porta mi ac, venenatis
          est. Nunc mi enim, tempus in scelerisque eget, rhoncus vulputate arcu.
          Praesent facilisis turpis a justo posuere, vel fringilla dui vehicula.
          In sed ornare magna, eget rutrum nibh. Nulla interdum quis est ut
          vestibulum. Maecenas fermentum nec mi sit amet mattis. Maecenas mollis
          eget augue non condimentum. Vestibulum mattis massa quis aliquam
          feugiat. Integer ut dignissim orci. Nunc laoreet efficitur congue.
        </div> */}
      </div>
    </div>
  );
}

export default Homepage;
