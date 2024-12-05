const HowItWorks = () => {
  return (
    <>
      <section className="p-5">
        <h2 className="font-bold text-xl text-center">How it works</h2>
        <p className="text-xl text-center">
          Reflect on your day, emotions, and thoughts with guided prompts or
          freeform entries
        </p>
        <div className="flex bg-gray-300 rounded-lg p-10  gap-3">
          <div className="border border-blue-300 rounded p-5">
            <img src="" alt="" />
            <h2>Sign Up</h2>
            <p>
              Create an account by signing up with your email. Set your
              preferences to receive guided prompts tailored to your unique
              needs and goals.
            </p>
          </div>
          <div className="border border-blue-300 rounded p-5">
            <img src="" alt="" />
            <h2>Choose Entry Type</h2>
            <p>
              Let our guided prompts inspire deeper reflection or freely express
              your thoughts with unstructured entries.The choice is yours,every
              time.
            </p>
          </div>
          <div className="border border-blue-300 rounded p-5">
            <img src="" alt="" />
            <h2>Reflect and Track</h2>
            <p>
              Log your daily moods and track your emotional pattern overtime.
              Easily revisit past entries to see how fast you have come on your
              journey of self discovery.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
