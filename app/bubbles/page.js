"use client"

// --------------------------------------- TAKE 1 ----------------------------------------------------

// import React, { useRef, useEffect } from 'react'

// // Declare a constant for the number of bubbles
// const NUM_BUBBLES = 40;

// function Bubbles() {
//   const bubblesRef = useRef()

//   useEffect(() => {
//     const bubbles = bubblesRef.current
//     const screenWidth = window.innerWidth
//     const screenHeight = window.innerHeight
    
//     for (let i = 0; i < NUM_BUBBLES; i++) {
//       const bubble = document.createElement('div')
//       bubble.classList.add('bubble', `bubble-${i}`)
//       bubbles.appendChild(bubble)
    
//       // Calculate the initial x and y position of the bubble using a random distribution of coordinates
//       const x = Math.random() * screenWidth
//       const y = Math.random() * screenHeight
//       bubble.style.transform = `translate3d(${x}px, ${y}px, 0)`
    
//       // Set the previous position of the bubble to be the same as the initial position
//       bubble.setAttribute('data-x', x)
//       bubble.setAttribute('data-y', y)
    
//       // Set the initial opacity of the bubble to 0 to make it invisible
//       bubble.style.opacity = 0
//     }

//     // Declare a variable to reference the timeout that triggers the interval
//     let timeout
  
//     // Use the setTimeout function to trigger the interval immediately
//     timeout = setTimeout(() => {
//       // Define the actions to be performed when the interval is triggered
//       const interval = () => {
//         for (let i = 0; i < NUM_BUBBLES; i++) {
//           const bubble = bubbles.querySelector(`.bubble-${i}`)
  
//           const x = Math.random() * screenWidth
//           const y = Math.random() * screenHeight
//           const xVelocity = Math.random() * 2 - 1
//           const yVelocity = Math.random() * 2 - 1
          
//           // Get the previous x and y position of the bubble from the "data-x" and "data-y" attributes
//           const prevX = parseFloat(bubble.getAttribute('data-x')) || x
//           const prevY = parseFloat(bubble.getAttribute('data-y')) || y
          
//           // Calculate the new x and y position of the bubble by adding a random velocity
//           // to the previous position, but only if the new position is within 100 pixels
//           // of the previous position
//           const newX = Math.abs(x + xVelocity - prevX) < 200 ? x + xVelocity : prevX
//           const newY = Math.abs(y + yVelocity - prevY) < 200 ? y + yVelocity : prevY
          
//           // Set the "data-x" and "data-y" attributes of the bubble to the new x and y position
//           bubble.setAttribute('data-x', newX)
//           bubble.setAttribute('data-y', newY)
          
  
//           // Use the transition property with multiple values separated by a comma
//           // to specify different transition durations for different CSS properties
//           bubble.style.transition = 'opacity 2s ease-in-out, transform 10s ease-in-out'

//           bubble.style.transform = `translate3d(${newX}px, ${newY}px, 0)`
//           bubble.style.opacity = 1
//         }
  
//         // Call the setTimeout function again to trigger the interval
//         // at the specified time interval
//         setTimeout(interval, 10000) // Update the interval to match the transition duration of the bubbles
//       }
  
//       // Call the interval function to trigger the interval immediately
//       interval()
//     }, 0) // Set the timeout to 0 milliseconds to trigger the interval immediately

//     // Add a cleanup function to remove the bubbles when the component is unmounted
//     return () => {
//       // Use the clearTimeout function to cancel the timeout that triggers the interval
//       clearTimeout(timeout)
//       for (let i = 0; i < NUM_BUBBLES; i++) {
//         const bubble = bubbles.querySelector(`.bubble-${i}`)
//         bubbles.removeChild(bubble)
//       }
//     }
//   }, [])
  

//   return <div ref={bubblesRef} style={{ height: '100vh', width: '100vw' }} />
// }

// export default Bubbles;

// --------------------------------------- TAKE 2 ----------------------------------------------------
// import React from 'react';

// const Bubbles = () => {
//   return (
//     <div className="bubbles">
//       <div className="bubble bubble-1"></div>
//       <div className="bubble bubble-2"></div>
//       <div className="bubble bubble-3"></div>
//       <div className="bubble bubble-4"></div>
//       <div className="bubble bubble-5"></div>
//       <div className="bubble bubble-6"></div>
//       <div className="bubble bubble-7"></div>
//       <div className="bubble bubble-8"></div>
//       <div className="bubble bubble-9"></div>
//       <div className="bubble bubble-10"></div>
//     </div>
//   );
// };

// export default Bubbles;


// --------------------------------------- TAKE 3 ----------------------------------------------------

import React, { useRef, useEffect } from 'react';

const BubbleBackground = () => {
  // Use the useRef hook to store a reference to the canvas element
  const canvasRef = useRef(null);

  // Use the useEffect hook to set up the canvas and start the animation loop
  useEffect(() => {
    // Get the drawing context from the canvas element
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set the dimensions of the canvas to match the dimensions of the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set the fill color to white
    ctx.fillStyle = 'white';

    // Generate a random initial position, velocity, and acceleration for each bubble
    // const bubbles = Array(20).fill().map(() => ({
    //   x: Math.random() * canvas.width,
    //   y: Math.random() * canvas.height,
    //   vx: (Math.random() - 0.5) * 2.5, // Reduce the velocity of the bubbles
    //   vy: (Math.random() - 0.5) * 2.5,
    //   ax: (Math.random() - 0.5) * 0.05, // Reduce the acceleration of the bubbles
    //   ay: (Math.random() - 0.5) * 0.05
    // }));

    const bubbleRadius = 50;
    const rows = 4; // Number of rows to divide the canvas into
    const cols = 5; // Number of columns to divide the canvas into
    const regionWidth = canvas.width / cols; // Width of each region
    const regionHeight = canvas.height / rows; // Height of each region

    const bubbles = []; // Array to store the bubbles

    // Generate a random initial position for each bubble
    for (let i = 0; i < 20; i++) {
      // Calculate the row and column for the current bubble
      const row = Math.floor(i / cols);
      const col = i % cols;

      // Calculate the x and y position for the current bubble within its region
      const x = (col + 0.5) * regionWidth;
      const y = (row + 0.5) * regionHeight;

      // Add the bubble to the array with the generated position and random velocity and acceleration
      bubbles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        ax: (Math.random() - 0.5) * 0.05,
        ay: (Math.random() - 0.5) * 0.05
      });
    }


   // Animate the bubbles by updating their positions and redrawing them on the canvas
const animate = () => {
  // Update the position of each bubble
  for (const bubble of bubbles) {
    // Add the velocity to the position of the bubble
    bubble.x += bubble.vx;
    bubble.y += bubble.vy;

    // If the bubble goes off the edge of the screen, reverse its velocity and add the acceleration to change its direction
    if (bubble.x - 50 < 0 || bubble.x + 50 > canvas.width) {
      bubble.vx = -bubble.vx;
      bubble.vx += bubble.ax;
    }
    if (bubble.y - 50 < 0 || bubble.y + 50 > canvas.height) {
      bubble.vy = -bubble.vy;
      bubble.vy += bubble.ay;
    }

    // Check if the bubble collides with any other bubbles
    for (const otherBubble of bubbles) {
      if (otherBubble === bubble) continue; // Skip the current bubble

      // Calculate the distance between the two bubbles
      const dx = bubble.x - otherBubble.x;
      const dy = bubble.y - otherBubble.y;
      const distance = Math.abs(Math.sqrt(dx * dx + dy * dy));

      // If the bubbles are colliding, update their velocities using the laws of elastic collision
      if (distance <= 100) {
        console.log('COLLIDE');

        // Calculate the total mass of the two colliding bubbles
        const m1 = 1; // Assume each bubble has a mass of 1
        const m2 = 1;
        const totalMass = m1 + m2;

        // Calculate the relative velocity of the bubbles along the line of collision
        const v1x = bubble.vx;
        const v1y = bubble.vy;
        const v2x = otherBubble.vx;
        const v2y = otherBubble.vy;
        const relativeX = v1x - v2x;
        const relativeY = v1y - v2y;

        // Calculate the angle of collision between the two bubbles
        const angle = Math.atan2(dy, dx);

        // Use the laws of elastic collision to update the velocities of the colliding bubbles
        const v1xPrime = ((m1 - m2) * v1x + 2 * m2 * v2x) / totalMass;
        const v1yPrime = ((m1 - m2) * v1y + 2 * m2 * v2y) / totalMass;
        const v2xPrime = ((m2 - m1) * v2x + 2 * m1 * v1x) / totalMass;
        const v2yPrime = ((m2 - m1) * v2y + 2 * m1 * v1y) / totalMass;

        // Update the velocities of the colliding bubbles
        bubble.vx = v1xPrime;
        bubble.vy = v1yPrime;
        otherBubble.vx = v2xPrime;
        otherBubble.vy = v2yPrime;

        // Use the updated velocities of the colliding bubbles to update their positions in the animation.
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
        otherBubble.x += otherBubble.vx;
        otherBubble.y += otherBubble.vy;
      }
    }
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw each bubble on the canvas
  for (const bubble of bubbles) {
    ctx.beginPath();
    ctx.arc(bubble.x, bubble.y, 50, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Animate the next frame
  requestAnimationFrame(animate);
};



    

    // Start the animation loop
    animate();
  }, []);

  // Return the canvas element
  return <canvas ref={canvasRef} id="bubble-background-canvas" />;
};


export default BubbleBackground;
