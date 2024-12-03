export default function Home() {
  return (
    <div
      style={{
        textAlign: "center", // Center the text horizontally
        marginTop: "40px", // Add some space from the top
        fontFamily: "'Arial', sans-serif", // Change the font
      }}
    >
      <h1
        style={{
          fontSize: "3.3rem", // Large font size
          color: "#ffffff", // Bright blue color for emphasis
          marginBottom: "20px",
        }}
      >
        Welcome to Url Shortener
      </h1>

      <p
      
        style={{
          fontSize: "1.4rem", // Slightly larger font for the message
          color: "#ffffff", // Subtle text color
        }}
      >
        Explore the coolest features of Url Shortener and enjoy the experience.
      </p>
    </div>
  );
}
