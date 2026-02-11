import "../styles/about.css";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>
          TitanTechParts is a technology-focused e-commerce platform designed to
          connect buyers and sellers through a reliable and user-friendly
          experience.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify the process of buying and selling technology
          products while ensuring transparency, efficiency, and ease of use for
          all users.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <p>
          The platform allows sellers to manage product listings and inventory,
          while customers can browse, compare, and purchase products securely.
        </p>
      </section>

      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>Email: support@titantechparts.com</p>
        <p>Phone: +44 1234 567890</p>
        <p>Address: Birmingham, United Kingdom</p>
      </section>
    </div>
  );
}
