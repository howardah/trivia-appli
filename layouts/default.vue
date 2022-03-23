<template>
  <div>
    <Head>
      <Title>Trivia! Trivia!</Title>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Source+Sans+3:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <slot />
  </div>
</template>

<style>
html {
  font-family: "Source Sans 3", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
