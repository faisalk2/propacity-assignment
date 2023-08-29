const handleSubmit = async (e) => {
  e.preventDefault();
  let form = document.getElementById("formSubmit");

  let userData = {
    name: form.name.value,
    email: form.email.value,
    mobile: form.mobile.value,
    meta: "meta data",
  };

  console.log(userData);

  let apiRes = await fetch(
    "https://api.propacity.in/api/v1/webhooks/integration/61cf0d44-1ede-4dfa-b3ce-930072581261/insertLead",
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    }
  );

  let apiData = await apiRes.text();
  if (apiData === "Lead Saved") {
    alert("data save in DB successfully");
  } else {
    alert("data not saved in DB ");
  }

  let res = await fetch(
    "https://script.google.com/macros/s/AKfycbzjVJ94yQogoLydhkV98miCMXHb96RNh94A0_-XzMN8rfXBeaeiX1zxLIyXhtawvX0y/exec",
    {
      method: "POST",
      body: new FormData(form),
    }
  );

  let data = await res.text();
  if (data == "Success") {
    alert("data save successfully in google sheet");
  } else {
    alert("data not saved successfully in google sheet");
  }

  if (data == "Success" && apiData == "Lead Saved") {
    window.location.href = "greetingPage.html";
  }
};

document.getElementById("formSubmit").addEventListener("submit", handleSubmit);
