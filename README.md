
Introduction
------------

Each message in the database contains the following attributes:

 - id: A unique ID assigned to each message
 - version: The version when this message first appeared
 - message: The actual message as presented by Git
 - description: A short description explaining the message


Message IDs
-----------

Each message is assigned an unique, five digit ID. The first two digits
specify the component which generated the message. This is in most cases the
plumbing or porcelain command, but can also be a library used internally. The
remaining three digits specify the message.

Here is a list of components and their IDs:

    git-init .................. 01
    git-add ................... 02
    git-commit ................ 03
    git-push .................. 04
    git-fetch ................. 05
    git-branch ................ 06


Version
-------

The value of this field is a one or two element array. The first element is
the version in which the message was first introduced. The second element, if
present, specifies the last version in which the message was last included. If
the first version is unknown, use '1.0.0'.
