jest.mock("@/firebaseConfig", () => ({
    signInWithGooglePopup: jest.fn(),
    signInWithFacebook: jest.fn(),
  }));
  