<template>
  <LoginLayout>
    <template #login>
      <main class="loginWrap">
         <div class="signup">
      <h2 class="signup__heading">Create account</h2>
      <p class="signup__already">
        Already have an account ?
        <a href="#" class="signup__link signup__link--underline">Sign In</a>
      </p>
      <form action="#" class="signup__form" autocomplete="off">
        <div class="form__group">
          <input type="text" class="form__input" placeholder="Midname" />
        </div>
        <div class="form__group form__group--2">
          <input type="text" class="form__input" placeholder="First name" />
          <input type="text" class="form__input" placeholder="Last name" />
        </div>
        <div class="form__group">
          <input type="email" class="form__input" placeholder="Email" />
        </div>
        <div class="form__group">
          <button type="submit" class="form__submit">
            <span class="form__submit-text">Sign Up </span
            ><i class="fa fa-long-arrow-right form__submit-icon"></i>
          </button>
        </div>
        <div class="form__tos">
          <input type="checkbox" name="" id="tos" />
          <label for="tos"
            >I have read and agree to the
            <a href="#" class="signup__link">Term of Service</a></label
          >
        </div>
      </form>
    </div>
      </main>
    </template>
  </LoginLayout>
</template>

<script>
import LoginLayout from "@/layouts/LoginLayout";

export default {
  name: "Login",
  components: {
    LoginLayout
  },
  methods:{
    register(){
      this.$router.push('/register')
    },
    submitLogin(){
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped lang="scss">
.loginWrap {
   width: 100%;
  height: 100vh;
  background-image: linear-gradient(to right top, #ff4988, #ffc781, #fffefc);
  display: flex;
  align-items: center;
  justify-content: center;
  :root {
  --primary-color: #4797ff;
  --text-color: #202020;
}
.signup {
  width: 100%;
  max-width: 50rem;
  background-color: white;
  border-radius: 10px;
  padding: 5.5rem 3.5rem;
}
.signup__heading {
  font-size: 4rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 2rem;
  color: var(--text-color);
}
.signup__already {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 3.5rem;
}
.signup__link {
  color: var(--primary-color);
  font-size: inherit;
  text-decoration: none;
}
.signup__link--underline {
  text-decoration: underline;
}
.form__group {
  margin-bottom: 1.5rem;
}
.form__group--2 {
  display: flex;
  justify-content: space-between;
}
.form__input {
  font-family: "Poppins", sans-serif;
  color: var(--text-color);

  padding: 1.5rem;
  border-radius: 1rem;
  outline: none;
  font-size: 1.6rem;
  font-weight: 500;
  border: 1px solid #eee;
  background-color: #eee;
  transition: 0.25s linear;
  width: 100%;
}
.form__input:focus {
  border-color: #eee;
  background-color: white;
}
.form__group--2 > .form__input {
  width: calc(50% - 2.5px);
}
.form__group--2 > .form__input:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.form__group--2 > .form__input:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.form__input::-webkit-input-placeholder {
  color: #ccc;
  font-style: italic;
}
.form__submit {
  border-radius: 10px;
  color: white;
  padding: 1.5rem;
  outline: none;
  font-family: "Poppins", sans-serif;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  border: 0;
  width: 100%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form__submit-text {
  margin: 0 auto;
}
.form__tos {
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: #999;
}
}

</style>