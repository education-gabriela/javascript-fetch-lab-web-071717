const baseUrl = "https://api.github.com";
const title = document.getElementById("title");
const body = document.getElementById("body");
const repository = "education-gabriela/javascript-fetch-lab";

function getIssues() {
  const url = `${baseUrl}/repos/${repository}/issues`;

  const options = {
    method: "get",
    headers: {
      Authorization: `token ${getToken()}`
    }
  };

  return fetch(url, options).then(response => response.json()).then(showIssues);
}

function showIssues(json) {
  const issuesDiv = document.getElementById("issues");
  const ul = document.createElement("ul");

  json.forEach(issue => {
    let li = document.createElement("li");
    li.innerHTML = `<a href="${issue.html_url}">${issue.title}</a>`;
    ul.append(li);
  });

  issuesDiv.append(ul);
}

function createIssue() {
  const url = `${baseUrl}/repos/${repository}/issues`;
  const postData = {
    title: title.value,
    body: body.value
  };

  const options = {
    body: JSON.stringify(postData),
    method: "post",
    headers: {
      Authorization: `token ${getToken()}`
    }
  };

  return fetch(url, options).then(getIssues).catch(console.log);
}

function showResults(json) {
  const resultsDiv = document.getElementById("results");
  results.innerHTML = `<p data-repository="${json.full_name}">
  <strong>Name: </strong>${json.full_name}<br>
  <strong>URL: </strong><a href="${json.html_url}">${json.html_url}</a>
  </p>`;
}

function forkRepo() {
  const repo = "learn-co-curriculum/javascript-fetch-lab";
  const url = `${baseUrl}/repos/${repo}/forks`;
  const organization = "education-gabriela";
  const postData = {
    organization: organization
  };

  const options = {
    body: JSON.stringify(postData),
    method: "post",
    headers: {
      Authorization: `token ${getToken()}`
    }
  };
  return fetch(url, options).then(response => response.json()).then(json => showResults(json));
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ""
}
