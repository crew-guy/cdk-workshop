import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { CodeBuildStep, CodePipeline, CodePipelineSource } from 'aws-cdk-lib/pipelines'
import * as codecommit from 'aws-cdk-lib/aws-codecommit'

export class WorkshopPipelineStack extends cdk.Stack{
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)
        // creates a CodeCommit repository called 'WorkshopRepo'
        const repo = new codecommit.Repository(this, 'WorkshopRepo', {
            repositoryName:'WorkshopRepo'
        })
        // The basic pipeline declaration. This sets the initial structure of our pipeline
        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: "WorkshopPipeline",
            synth: new CodeBuildStep("SynthStep", {
                input: CodePipelineSource.codeCommit(repo, 'master'),
                installCommands: ['npm install -g aws-cdk'],
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            })
        })
    }

}