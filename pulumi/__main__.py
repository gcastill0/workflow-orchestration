import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
require('axios'); // npm install axios --save

const githubRelease = `https://github.com/<github-user>/<github-repo>/releases/download/<release-tag>/archive.zip`;

const amiId = "ami-0323c3dd2da7fb37d"; // Amazon Linux 2 AMI (HVM), SSD Volume Type - ami-0323c3dd2da7fb37d (64-bit x86) / ami-0b37660311a2be837 (64-bit Arm)

// VPC and Internet Gateway
const vpc = new aws.ec2.Vpc("my-vpc", {
    cidrBlock: "172.16.0.0/16"
});

const igw = new aws.ec2.InternetGateway("my-igw", {
    vpcId: vpc.id
});

// EC2 Instance
const userData = `#!/bin/bash
wget -O ~/archive.zip ${githubRelease}
unzip ~/archive.zip

python -m SimpleHTTPServer 80
`;

const sshKeyName = "my-ssh-key";
const ec2Instance = new aws.ec2.Instance("my-instance", {
    ami: amiId,
    instanceType: "t2.micro",
    vpcSecurityGroupIds: [securityGroup.id],
    keyName: sshKeyName,
    userData: userData,
    rootBlockDevice: {volumeSize: 10}
});

// Elastic IP
const ip = new aws.ec2.Eip("my-ip", {
    vpc: true,
    instance: ec2Instance.id
});

// Security Group allowing HTTPS (port 443)
const securityGroup = new aws.ec2.SecurityGroup("my-security-group", {
    vpcId: vpc.id,
    ingress: [
        { protocol: "tcp", fromPort: 443, toPort: 443, cidrBlocks: ["0.0.0.0/0"] }
    ]
});

// Export outputs:
export const instanceId = ec2Instance.id;
export const instancePublicGw = ec2Instance.publicIp;
