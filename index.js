const core = require('@actions/core');
const github = require('@actions/github');

try {
    const context = github.context

    const environment = core.getInput('environment')
    const token = core.getInput('token')
    const owner = context.repo.owner
    const repo = context.repo.repo

    const octokit = github.getOctokit(token)

    const dep = await octokit.rest.repos.listDeployments({
        owner,
        repo,
        environment
    })

    console.log(JSON.stringify(dep))

    if (dep.size > 0) {
        core.setOutput("last", dep[0].sha);
    }
    if (dep.size > 1) {
        core.setOutput("prev", dep[1].sha);
    }

} catch (error) {
    core.setFailed(error.message);
}
