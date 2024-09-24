import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

const UPLOAD_URL = 'https://plugins.jetbrains.com/plugin/uploadPlugin'

const MARKETPLACE_PAT: string = core.getInput('marketplace-pat', {
  required: true
})

let ARCHIVE_PATH: string = core.getInput('archive-path', {
  required: true
})

const PLUGIN_XML_ID: string = core.getInput('plugin-xml-id')
const PLUGIN_ID: number = parseInt(core.getInput('plugin-id'))
const CHANNEL: string = core.getInput('channel') || 'stable'
const IS_HIDDEN: boolean = core.getInput('is-hidden') === 'true' || false

async function run(): Promise<void> {
  try {
    if (!fs.existsSync(ARCHIVE_PATH)) {
      if (process.env.GITHUB_WORKSPACE) {
        ARCHIVE_PATH = path.join(process.env.GITHUB_WORKSPACE, ARCHIVE_PATH)

        if (!fs.existsSync(ARCHIVE_PATH)) {
          core.setFailed(`No plugin ZIP file found at: '${ARCHIVE_PATH}'`)
          return
        }
      }else {
        core.setFailed(`No plugin ZIP file found at: '${ARCHIVE_PATH}'`)
        return
      }
    }

    if (PLUGIN_ID && PLUGIN_XML_ID) {
      core.setFailed(
        `Please supply the plugin-id OR the plugin-xml-id, but not both.`
      )
      return
    }

    const form = new FormData()

    const fileBuffer = fs.readFileSync(ARCHIVE_PATH)
    const fileBlob = new Blob([fileBuffer], {type: 'application/zip'})

    if (PLUGIN_ID) {
      form.append('pluginId', PLUGIN_ID.toString())
    }

    if (PLUGIN_XML_ID) {
      form.append('xmlId', PLUGIN_XML_ID)
    }

    form.append('channel', CHANNEL)
    form.append('isHidden', IS_HIDDEN ? 'true' : 'false')
    form.append('file', fileBlob, path.basename(ARCHIVE_PATH))

    const response = await fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MARKETPLACE_PAT}`
      },
      body: form
    })

    if (!response.ok) {
      core.setFailed(`HTTP error! status: ${response.status}`)
      return
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      core.setFailed(err.toString())
    }
  }
}

run()
