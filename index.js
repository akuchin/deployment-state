const core = require('@actions/core');
const github = require('@actions/github');

async function run() {

    try {
        const context = github.context

        const environment = core.getInput('environment')
        const token = core.getInput('token')
        const owner = context.repo.owner
        const repo = context.repo.repo

        const octokit = github.getOctokit(token)

        const {data} = await octokit.rest.repos.listDeployments({
            owner,
            repo,
            environment
        })

        if (data.length > 0) {
            core.setOutput("last", data[0].sha);
        }
        if (data.length > 1) {
            core.setOutput("prev", data[1].sha);
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
