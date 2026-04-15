# 10 Audit and File Design

## Activity logging
Use two layers:
- `activity_logs` for timeline views and user-facing history
- `entity_change_logs` for detailed before and after diffs

### Event examples
- created
- updated
- assigned
- unassigned
- moved_column
- status_changed
- due_date_changed
- cancelled
- restored
- deleted
- uploaded_image
- ai_generated_task
- cost_changed

## File upload design
- client requests presigned upload URL from backend
- backend validates file type, size, entity context, and permission
- client uploads directly to S3
- client confirms upload completion to backend
- backend writes attachment metadata and activity log

## Attachment metadata
- entity type
- entity id
- object key
- original filename
- mime type
- file size
- uploaded by
- checksum
- scan status

## Retrieval
- use signed GET URLs or proxy download through backend for private assets
- store thumbnails separately if image previews are needed at scale
