import React, { Component } from 'react';

const images: string[] = [
  "https://rukminim1.flixcart.com/flap/3376/560/image/7760adba4cdde874.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1688/280/image/90cdb794821102c8.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/374a88846acf16b2.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1688/280/image/e3e5625077962405.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1688/280/image/9684c5bba6b14e7f.jpg?q=50"
];

interface CarouselState {
  currentIndex: number;
}

class MyCarousel extends Component<{}, CarouselState> {
  private autoPlayInterval: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount(): void {
    this.autoPlayInterval = setInterval(this.nextSlide, 3000);
  }

  componentWillUnmount(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide = (): void => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % images.length
    }));
  };

  prevSlide = (): void => {
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex - 1 + images.length) % images.length
    }));
  };

  goToSlide = (index: number): void => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { currentIndex } = this.state;

    return (
      <div style={styles.carouselContainer}>
        <div style={{ ...styles.carousel, transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Slide ${index}`} style={styles.image} />
          ))}
        </div>

        <div style={styles.dotsContainer}>
          {images.map((_, index) => (
            <span 
              key={index} 
              style={index === currentIndex ? styles.activeDot : styles.dot} 
              onClick={() => this.goToSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const styles: Record<string, React.CSSProperties> = {
  carouselContainer: {
    width: '96%',
    maxWidth: '100vw',
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto',
  },
  carousel: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '5px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'gray',
    cursor: 'pointer',
  },
  activeDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
};

export default MyCarousel;
