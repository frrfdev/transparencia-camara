'use server';

import { MongoClient } from 'mongodb';

export async function getPropositionResume(propositionId: string) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MongoDB URI is not defined in the environment variables');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('resume_db');
    const resumes = database.collection('resumes');

    const resume = await resumes.findOne({ proposition_number: propositionId });

    if (!resume) {
      return null;
    }

    return {
      id: resume._id.toString(),
      propositionNumber: resume.proposition_number,
      resume: resume.resume, // Add this line to include the resume field
    };
  } catch (error) {
    console.error('Error fetching proposition resume:', error);
    throw error;
  } finally {
    await client.close();
  }
}
