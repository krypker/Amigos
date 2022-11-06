import { Fragment } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MintGallery from "../components/MintGallery";

export default function Home() {
  return (
    <div className='bg-white h-screen container mx-auto'>
      <Head>
        <title>409 Amigos</title>
        <meta name='description' content='409 AMIGOS' />
        <link rel='icon' />
      </Head>

      <main>
        <Header />
        <Hero
          header='409 AMIGOS'
          message={
            <Fragment>
              AMIGOS are 409 friends, artists and enthusiasts who love IDM,
              glitch, experimental techno, noise and the like. Some of them may
              like 409 music and everyone is taking part in his music quest.
              <br />
              <br />
              This is a private slow mint. The allow list will be updated from
              time to time and people in the list will be able to mint one AMIGO
              of their choice..
              <br />
              <br />
              You can have more info and apply for an AMIGO &nbsp;
              <a
                className='text-pink-600 cursor-pointer font-bold'
                rel='noreferrer'
                href='https://409.gitbook.io/409-amigos/'
                target='_blank'
              >
                here. &nbsp;
              </a>
            </Fragment>
          }
        />
        <MintGallery />
      </main>
    </div>
  );
}
